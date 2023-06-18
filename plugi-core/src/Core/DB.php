<?php

namespace Plugi\Core;

use Exception;
use PDO;

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

        // Try a select statement against the table
        // Run it in try-catch in case PDO is in ERRMODE_EXCEPTION.
        try {
            $result = $this->pdo->query("SELECT 1 FROM {$table} LIMIT 1");
        } catch (Exception $e) {
            // We got an exception (table not found)
            return FALSE;
        }

        // Result is either boolean FALSE (no table found) or PDOStatement Object (table found)
        return $result !== FALSE;
    }

    /**
     * Perform a custom query with user input data passed as $parameters.
     *
     * @param string $table
     * @param string $sql
     * @return bool
     */
    public function prepare(string $table, string $sql)
    {
        // check if table with the name $table exists. if not, execute $query.'
        try {
            $result = $this->pdo->query("SELECT 1 FROM {$table} LIMIT 1");
            return TRUE;
        } catch (Exception $e) {
            $stmt = $this->pdo->prepare($sql);
            return $stmt->execute();
        }
    }
}
