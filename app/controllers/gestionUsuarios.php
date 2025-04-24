<?php // Archivo: app/controllers/GestionUsuarios.php
header('Content-Type: application/json');
require_once '../../config/database.php';
$action=$_POST['action']??''; $tipo=$_POST['tipo']??'';

switch($action){
    case 'listar':listar($conn,$tipo);break;
    case 'agregar':agregar($conn,$_POST);break;
    case 'editar':editar($conn,$_POST);break;
    case 'eliminar':eliminar($conn,$_POST['id']);break;
    default:echo json_encode(['success'=>false,'mensaje'=>'Acción inválida']);
}

function listar($conn,$tipo){
    $stmt=$conn->prepare("SELECT id,tipo,nombre,apellidos,email,telefono,direccion FROM usuarios_tb WHERE tipo=?");
    $stmt->bind_param('s',$tipo); $stmt->execute(); $res=$stmt->get_result();
    $data=[]; while($row=$res->fetch_assoc()) $data[]=$row;
    echo json_encode($data);
}

function agregar($conn,$d){
    $pass=password_hash($d['contrasena'],PASSWORD_DEFAULT);
    $stmt=$conn->prepare("INSERT INTO usuarios_tb (tipo,nombre,apellidos,email,telefono,direccion,contrasena) VALUES(?,?,?,?,?,?,?)");
    $stmt->bind_param('sssssss',$d['tipo'],$d['nombre'],$d['apellidos'],$d['email'],$d['telefono'],$d['direccion'],$pass);
    $ok=$stmt->execute(); echo json_encode(['success'=>$ok,'mensaje'=>$stmt->error]);
}

function editar($conn,$d){
    if(!empty($d['contrasena'])){
        $pass=password_hash($d['contrasena'],PASSWORD_DEFAULT);
        $stmt=$conn->prepare("UPDATE usuarios_tb SET nombre=?,apellidos=?,email=?,telefono=?,direccion=?,contrasena=? WHERE id=?");
        $stmt->bind_param('ssssssi',$d['nombre'],$d['apellidos'],$d['email'],$d['telefono'],$d['direccion'],$pass,$d['id']);
    } else {
        $stmt=$conn->prepare("UPDATE usuarios_tb SET nombre=?,apellidos=?,email=?,telefono=?,direccion=? WHERE id=?");
        $stmt->bind_param('sssssi',$d['nombre'],$d['apellidos'],$d['email'],$d['telefono'],$d['direccion'],$d['id']);
    }
    $ok=$stmt->execute(); echo json_encode(['success'=>$ok,'mensaje'=>$stmt->error]);
}

function eliminar($conn,$id){
    $stmt=$conn->prepare("DELETE FROM usuarios_tb WHERE id=?"); $stmt->bind_param('i',$id);
    $ok=$stmt->execute(); echo json_encode(['success'=>$ok,'mensaje'=>$stmt->error]);
}