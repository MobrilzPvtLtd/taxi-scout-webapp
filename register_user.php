<?php
// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Max-Age: 86400"); // Cache preflight response for 24 hours
    http_response_code(204); // No content for OPTIONS
    exit();
}

// Set CORS headers for actual request
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection
$servername = "localhost";
$username = "root";
$password = ""; // Empty password as specified
$dbname = "lara";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
    exit();
}

// Get data from POST request
$data = json_decode(file_get_contents("php://input"), true);

// Extract fields
$name = isset($data['name']) ? $data['name'] : '';
$email = isset($data['email']) ? $data['email'] : '';
$password = isset($data['password']) ? password_hash($data['password'], PASSWORD_DEFAULT) : '';
$mobile = isset($data['mobile']) ? $data['mobile'] : '';
$country = isset($data['country']) ? $data['country'] : '';
$profile_picture = isset($data['profile_picture']) ? $data['profile_picture'] : null;

// Handle file upload for profile picture
$profile_picture_path = null;
if ($profile_picture) {
    $image_parts = explode(";base64,", $profile_picture);
    $image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $image_type_aux[1];
    $image_base64 = base64_decode($image_parts[1]);
    $file_name = uniqid() . '.' . $image_type;
    $file_path = 'Uploads/' . $file_name;
    if (!file_exists('Uploads')) {
        mkdir('Uploads', 0777, true);
    }
    file_put_contents($file_path, $image_base64);
    $profile_picture_path = $file_path;
}

// Prepare SQL query
$sql = "INSERT INTO users (
    name, email, password, mobile, country, profile_picture,
    active, email_confirmed, mobile_confirmed, created_at, updated_at
) VALUES (
    :name, :email, :password, :mobile, :country, :profile_picture,
    1, 0, 0, NOW(), NOW()
)";

try {
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':mobile', $mobile);
    $stmt->bindParam(':country', $country);
    $stmt->bindParam(':profile_picture', $profile_picture_path);
    $stmt->execute();
    echo json_encode(["message" => "User registered successfully"]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error: " . $e->getMessage()]);
}

$conn = null;
?>