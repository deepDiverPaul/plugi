<?php

namespace Plugi\Core;

use Exception;
use PDO;
use PDOException;
use Plugi\Extensions;
use Plugi\Repositories\SettingRepository;

/**
 * Class DB
 *
 * A basic shell around PDO.
 *
 * @package Plugi\Core
 */
class DB
{
    /**
     * @var PDO $pdo
     */
    protected PDO $pdo;

    /**
     * DB constructor.
     *
     */
    public function __construct()
    {
        $this->pdo = new PDO(
            $_ENV['DATABASE_DRIVER'] . ':host=' . $_ENV['DATABASE_HOST'] . ';dbname=' . $_ENV['DATABASE_DATABASE'] . ";options='--client_encoding=" . $_ENV['DATABASE_CHARSET'] . "'",
            $_ENV['DATABASE_USERNAME'],
            $_ENV['DATABASE_PASSWORD'],
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        $this->pdo->exec("set names " . $_ENV['DATABASE_CHARSET']);
    }

    /**
     * Return the id of the last inserted record.
     *
     * @return string
     */
    public function lastInsertId(): string
    {
        return $this->pdo->lastInsertId();
    }

    /**
     * Return all records of the given table and return instances of the given class.
     *
     * @param array|string $columns
     * @param string $table
     * @return array
     */
    public function all(string $table, array|string $columns = '*'): array
    {
        try {
            if (is_array($columns)) {
                foreach ($columns as &$column) {
                    $column = preg_replace('/[^a-zA-Z_]*/', '', $column);
                }
                $columns = implode(',', $columns);
                $stmt = $this->pdo->prepare("SELECT $columns FROM $table");
            } else {
                $stmt = $this->pdo->prepare("SELECT * FROM $table");
            }
            $stmt->execute();
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            $_SESSION["phpb_flash"] = [
                'message-type' => 'error',
                'message' => phpb_trans('website-manager.check-database')
            ];
            return [];
        }
    }

    /**
     * Return the first record of the given table as an instance of the given class.
     *
     * @param string $table
     * @param $id
     * @return mixed
     */
    public function findWithId(string $table, $id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM {$table} WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetchAll();
    }

    /**
     * Perform a custom select query with user input data passed as $parameters.
     *
     * @param string $query
     * @param array $parameters
     * @return array
     */
    public function select(string $query, array $parameters)
    {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute($parameters);
        return $stmt->fetchAll();
    }

    /**
     * Perform a custom query with user input data passed as $parameters.
     *
     * @param string $query
     * @param array $parameters
     * @return bool
     */
    public function query(string $query, array $parameters = [])
    {
        $stmt = $this->pdo->prepare($query);
        return $stmt->execute($parameters);
    }

    function tableExists(string $table): bool
    {
        $tableName = $_ENV['DATABASE_PREFIX'] . phpb_remove_non_alpha_numeric($table);
        try {
            $this->pdo->query("SELECT 1 FROM {$tableName} LIMIT 1");
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public function columnExists(string $table, string $column): bool
    {
        $tableName = $_ENV['DATABASE_PREFIX'] . phpb_remove_non_alpha_numeric($table);
        // check if table with the name $table exists. if not, execute $query.'
        try {
            $rs = $this->pdo->query("SELECT * FROM {$tableName} LIMIT 0");
            for ($i = 0; $i < $rs->columnCount(); $i++) {
                $col = $rs->getColumnMeta($i);
                $columns[] = $col['name'];
            }
            if (in_array($column, $columns)) return true;
            return false;
        } catch (Exception $e) {
            return false;
        }
    }

    public function uniqueKeyExists(string $table, string $key)
    {
        $tableName = $_ENV['DATABASE_PREFIX'] . phpb_remove_non_alpha_numeric($table);
        // check if table with the name $table exists. if not, execute $query.'
        try {
            $keys = $this->select(
                "SELECT CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = ? AND TABLE_SCHEMA = 'plugi' AND TABLE_NAME = ? AND CONSTRAINT_TYPE = 'UNIQUE'",
                [$key, $tableName]
            );
            if (count($keys) === 1) return true;
            return false;
        } catch (Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    public function getDBDefinition() {
        $tables = include __DIR__.'/../../config/tables.php';
        foreach (Extensions::getConfigs() as $extkey => $config){
            if(key_exists('tables', $config)){
                foreach ($config['tables'] as $table => $definition){
                    $tables['ext__'.$extkey.'_'.$table] = $definition;
                }
            }
        }
        return $tables;
    }

    public function getDBDefinitionHash() {
        return sha1(json_encode($this->getDBDefinition()));
    }

    public function diffDB() {
        $tables = $this->getDBDefinition();
        $diff = [];

        foreach ($tables as $table => $tableDefinition) {
            if ($this->tableExists($table) === false) {
                $diff[$table] = false;
            } else {
                $diff[$table]['columns'] = [];
                foreach ($tableDefinition['columns'] as $column => $columnDefinition) {
                    if(!$this->columnExists($table, $column)) $diff[$table]['columns'][$column] = $columnDefinition;
                }
                $diff[$table]['uniqueKeys'] = [];
                foreach ($tableDefinition['uniqueKeys'] as $key => $keyDefinition) {
                    if(!$this->uniqueKeyExists($table, $key)) $diff[$table]['uniqueKeys'][$key] = '`'.implode('`,`', $keyDefinition).'`';
                }
            }

        }

        return $diff;
    }

    public function resolveDiffDB() {
        $diff = $this->diffDB();
        foreach ($diff  as $table => $tableDiff) {
            $tableName = $_ENV['DATABASE_PREFIX'] . phpb_remove_non_alpha_numeric($table);
            if($tableDiff === false){
                $this->query("CREATE TABLE {$tableName} (`id` int NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3");
                $this->query("ALTER TABLE {$tableName} ADD PRIMARY KEY (`id`)");
                $this->query("ALTER TABLE {$tableName} MODIFY `id` int NOT NULL AUTO_INCREMENT");
            } elseif (is_array($tableDiff)) {
                foreach ($tableDiff['columns'] as $column => $columnDefinition) {
                    $this->query("ALTER TABLE {$tableName} ADD {$column} {$columnDefinition}");
                }
                foreach ($tableDiff['uniqueKeys'] as $key => $keyDefinition) {
                    $this->query("ALTER TABLE {$tableName} ADD UNIQUE KEY {$key} ($keyDefinition)");
                }
            }
        }
        $settingRepository = new SettingRepository;
        $settingRepository->updateSettings(['db-definition' => $this->getDBDefinitionHash()]);
    }
}
