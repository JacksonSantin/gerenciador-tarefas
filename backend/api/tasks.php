<?php
include 'cors.php';
require_once("../conf/db_connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');

    try {
        $completed = isset($_GET['completed']) ? $_GET['completed'] : null;
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        $idStart = isset($_GET['id_start']) ? $_GET['id_start'] : null;
        $idEnd = isset($_GET['id_end']) ? $_GET['id_end'] : null;
        $createdAt = isset($_GET['created_at']) ? $_GET['created_at'] : null;
        $createdAtStart = isset($_GET['created_at_start']) ? $_GET['created_at_start'] : null;
        $createdAtEnd = isset($_GET['created_at_end']) ? $_GET['created_at_end'] : null;

        $sql = 'SELECT * FROM tasks WHERE 1=1';
        $params = [];

        if ($completed !== null) {
            if (strtolower($completed) === 'true' || $completed === '1') {
                $completedValue = 'TRUE';
            } elseif (strtolower($completed) === 'false' || $completed === '0') {
                $completedValue = 'FALSE';
            } else {
                http_response_code(400);
                echo json_encode(['error' => ['message' => 'Valor inválido para o parâmetro completed']]);
                exit;
            }

            $sql .= ' AND completed = ?';
            $params[] = $completedValue;
        }

        if ($createdAtStart !== null) {
            $dateStart = DateTime::createFromFormat('Y-m-d', $createdAtStart);
            if ($dateStart === false) {
                http_response_code(400);
                echo json_encode(['error' => ['message' => 'Data inválida para o parâmetro created_at_start']]);
                exit;
            }

            $sql .= ' AND created_at >= ?';
            $params[] = $dateStart->format('Y-m-d 00:00:00');
        }

        if ($createdAtEnd !== null) {
            $dateEnd = DateTime::createFromFormat('Y-m-d', $createdAtEnd);
            if ($dateEnd === false) {
                http_response_code(400);
                echo json_encode(['error' => ['message' => 'Data inválida para o parâmetro created_at_end']]);
                exit;
            }

            $sql .= ' AND created_at <= ?';
            $params[] = $dateEnd->format('Y-m-d 23:59:59');
        }

        if ($createdAt !== null) {
            $date = DateTime::createFromFormat('Y-m-d', $createdAt);
            if ($date === false) {
                http_response_code(400);
                echo json_encode(['error' => ['message' => 'Data inválida para o parâmetro created_at_start']]);
                exit;
            }

            $sql .= ' AND created_at::date = ?';
            $params[] = $date->format('Y-m-d');
        }

        if ($idStart !== null) {
            // Verificar se id_start é um número
            if (!is_numeric($idStart)) {
                http_response_code(400);
                echo json_encode(['error' => ['message' => 'ID inválido para o parâmetro id_start']]);
                exit;
            }

            $sql .= ' AND id >= ?';
            $params[] = (int)$idStart;
        }

        if ($idEnd !== null) {
            // Verificar se id_end é um número
            if (!is_numeric($idEnd)) {
                http_response_code(400);
                echo json_encode(['error' => ['message' => 'ID inválido para o parâmetro id_end']]);
                exit;
            }

            $sql .= ' AND id <= ?';
            $params[] = (int)$idEnd;
        }

        if ($id !== null) {
            if (!is_numeric($id)) {
                http_response_code(400);
                echo json_encode(['error' => ['message' => 'ID inválido']]);
                exit;
            }

            $sql .= ' AND id = ?';
            $params[] = (int)$id;
        }



        $query = $con->prepare($sql);
        $query->execute($params);
        $tasks = $query->fetchAll(PDO::FETCH_ASSOC);

        if (!$tasks) {
            http_response_code(204);
            exit;
        }

        http_response_code(200);
        echo json_encode($tasks);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => ['message' => 'Erro ao buscar tarefas!', 'details' => $e->getMessage()], $sql]);
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
        $query = $con->prepare('SELECT COUNT(*) FROM tasks WHERE title = ?');
        $query->execute([$data['title']]);
        $exists = $query->fetchColumn();

        if ($exists > 0) {
            http_response_code(400);
            echo json_encode(['error' => ['message' => 'O título já existe!']]);
            exit;
        }

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
