<?php
include 'cors.php';
require_once("../conf/db_connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');

    try {
        $query = $con->query('SELECT * FROM tasks');
        $tasks = $query->fetchAll(PDO::FETCH_ASSOC);

        if (!$tasks) {
            http_response_code(204);
            exit;
        }

        http_response_code(200);
        echo json_encode($tasks);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => ['message' => 'Erro ao buscar tarefas!', 'details' => $e->getMessage()]]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');

    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['title']) || empty($data['completed'])) {
        http_response_code(400);
        echo json_encode(['error' => ['message' => 'Dados incompletos!']]);
        exit;
    }

    try {
        $query = $con->prepare('INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)');
        $query->execute([$data['title'], $data['description'], $data['completed']]);
        http_response_code(201);
        echo json_encode(['message' => 'Tarefa criada com sucesso!']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => ['message' => 'Erro ao criar a tarefa!', 'details' => $e->getMessage()]]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    header('Content-Type: application/json');

    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['id']) || empty($data['title']) || empty($data['completed'])) {
        http_response_code(400);
        echo json_encode(['error' => ['message' => 'Dados incompletos!']]);
        exit;
    }

    try {
        $query = $con->prepare('UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?');
        $query->execute([$data['title'], $data['description'], $data['completed'], $data['id']]);
        echo json_encode(['message' => 'Tarefa atualizada com sucesso!']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => ['message' => 'Erro ao criar a tarefa!', 'details' => $e->getMessage()]]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    header('Content-Type: application/json');

    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => ['message' => 'ID da tarefa não encontrado!']]);
        exit;
    }

    try {
        $query = $con->prepare('DELETE FROM tasks WHERE id = ?');
        $query->execute([$data['id']]);
        echo json_encode(['message' => 'Tarefa excluída com sucesso!']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => ['message' => 'Erro ao excluir a tarefa!', 'details' => $e->getMessage()]]);
    }
}
