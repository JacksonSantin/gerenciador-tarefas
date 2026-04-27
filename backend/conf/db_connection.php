<?php

$db_connection = "pgsql";
$db_host       = "postgres";
$db_database   = "database_postgres";
$db_username   = "postgres";
$db_password   = "root";

try {
    $dns = "$db_connection:host=$db_host;port=5432;dbname=$db_database;";

    $con = new PDO($dns, $db_username, $db_password);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro na conexão com o banco de dados: " . $e->getMessage());
}
