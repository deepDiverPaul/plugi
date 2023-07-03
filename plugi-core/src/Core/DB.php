<?php

namespace Plugi\Core;

use Exception;
use PDO;
use Plugi\Extensions;
use Plugi\Repositories\SettingRepository;
use Plugi\Setting;

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
    protected $pdo;

    /**
     * DB constructor.
     *
     * @param array $config
     */
    public function __construct(array $config)
    {
        $this->pdo = new PDO(
            $config['driver'] . ':host=' . $config['host'] . ';dbname=' . $config['database'] . ";options='--client_encoding=" . $config['charset'] . "'",
            $config['username'],
            $config['password'],
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        $this->pdo->exec("set names " . $config['charset']);
    }

    /**
     * Return the id of the last inserted record.
     *
     * @return string
     */
    public function lastInsertId()
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
    public function all(string $table, $columns = '*')
    {
        try {
            if (is_array($columns)) {
                foreach ($columns as &$column) {
                    $column = preg_replace('/[^a-zA-Z_]*/', '', $column);
                }
                $columns = implode(',', $columns);
                $stmt = $this->pdo->prepare("SELECT {$columns} FROM {$table}");
            } else {
                $stmt = $this->pdo->prepare("SELECT * FROM {$table}");
            }
            $stmt->execute();
            return $stmt->fetchAll();
        } catch (\PDOException $e) {
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

    function tableExists($table) {
        try {
            $this->pdo->query("SELECT 1 FROM {$table} LIMIT 1");
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public function columnExists(string $table, string $column)
    {
        // check if table with the name $table exists. if not, execute $query.'
        try {
            $rs = $this->pdo->query("SELECT * FROM {$table} LIMIT 0");
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
        // check if table with the name $table exists. if not, execute $query.'
        try {
            $keys = $this->select(
                "SELECT CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = ? AND TABLE_SCHEMA = 'plugi' AND TABLE_NAME = ? AND CONSTRAINT_TYPE = 'UNIQUE'",
                [$key, $table]
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
            if($tableDiff === false){
                $this->query("CREATE TABLE {$table} (`id` int NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3");
                $this->query("ALTER TABLE {$table} ADD PRIMARY KEY (`id`)");
                $this->query("ALTER TABLE {$table} MODIFY `id` int NOT NULL AUTO_INCREMENT");
            } elseif (is_array($tableDiff)) {
                foreach ($tableDiff['columns'] as $column => $columnDefinition) {
                    $this->query("ALTER TABLE {$table} ADD {$column} {$columnDefinition}");
                }
                foreach ($tableDiff['uniqueKeys'] as $key => $keyDefinition) {
                    $this->query("ALTER TABLE {$table} ADD UNIQUE KEY {$key} ($keyDefinition)");
                }
            }
        }
        $settingRepository = new SettingRepository;
        $settingRepository->updateSettings(['db-definition' => $this->getDBDefinitionHash()]);
    }
}
