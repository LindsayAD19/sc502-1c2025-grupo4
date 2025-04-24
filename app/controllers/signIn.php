<?php
require_once '../../config/database.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST["email"];
    $contrasena = $_POST["contrasena"];

    $sql = "SELECT * FROM usuarios_tb WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);

    if ($stmt->execute()) {
        $resultado = $stmt->get_result();

        if ($resultado->num_rows === 1) {
            $usuario = $resultado->fetch_assoc();

            if (password_verify($contrasena, $usuario["contrasena"])) {
                $_SESSION["usuario_id"] = $usuario["id"];
                $_SESSION["usuario_nombre"] = $usuario["nombre"];
                $_SESSION["foto_perfil"] = $usuario["foto_perfil"];
                $_SESSION["usuario_rol"] = $usuario["tipo"];

                echo json_encode(["success" => true, "rol" => $usuario["tipo"]]);
            } else {
                echo json_encode(["success" => false, "mensaje" => "Contraseña incorrecta."]);
            }
        } else {
            echo json_encode(["success" => false, "mensaje" => "Usuario no encontrado."]);
        }
    } else {
        echo json_encode(["success" => false, "mensaje" => "Error al ejecutar la consulta."]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "mensaje" => "Método no permitido."]);
}
?>