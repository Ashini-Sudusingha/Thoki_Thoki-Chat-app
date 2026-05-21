# 🖥️ ChatApp - Java EE WebSocket Backend

This is the backend component of the **Real-Time Chat Application**. It is constructed as a standard Java Web Application using NetBeans, Jakarta EE servlets, Hibernate ORM, and Java WebSockets.

---

## 🛠️ Technology Stack

*   **Java SE / EE** (JDK 8/17+)
*   **Hibernate ORM 4.3** (For database persistence and object-relational mapping)
*   **WebSocket API** (`javax.websocket` / `@ServerEndpoint`)
*   **GSON** (For fast JSON processing)
*   **MySQL Connector J 8.4** (For database connection)
*   **NetBeans IDE Project Template** (Ant-based build system)

---

## 📁 Package Structure

*   `entity/`: Contains Hibernate JPA entity mappings:
    *   `BaseEntity.java`: Holds shared database audit columns (`created_at` and `updated_at`).
    *   `User.java`: Stores user credentials, phone numbers, names, and online status.
    *   `Chat.java`: Stores single message logs, sent files (URI lists), and statuses.
    *   `FriendList.java`: Stores user connections, friend pairings, and friendship states.
    *   `Status.java`: Status enum representing system-wide values (SENT, READ, ONLINE, etc.).
*   `controller/`: Servlets managing HTTP operations:
    *   `UserController.java`: Manages new user registrations.
    *   `UserSignInController.java`: Standardized sign-in validation.
    *   `ProfileController.java`: Updates profiles and avatars.
*   `socket/`: WebSocket endpoint and helper services:
    *   `ChatEndPoint.java`: WebSocket Server Endpoint (`/socket/{userId}`) managing active sessions.
    *   `ChatService.java`: Resolves message exchanges and stores chats via Hibernate.
    *   `UserService.java`: Manages database transactions for users.
    *   `ProfileService.java`: Profile data transactions.
*   `util/`: General utilities (Hibernate Session Factory creator).

---

## 🚀 Setup & Deployment

### 1. Database Setup
Create a local MySQL database named `chat_app` and run the following queries:

```sql
CREATE DATABASE IF NOT EXISTS chat_app;
USE chat_app;

CREATE TABLE IF NOT EXISTS `user` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `country_code` VARCHAR(5) NOT NULL,
    `contact_no` VARCHAR(45) NOT NULL UNIQUE,
    `status` VARCHAR(45) DEFAULT 'ONLINE',
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `friend_list` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `friend_id` INT NOT NULL,
    `user_status` VARCHAR(30) DEFAULT 'ACTIVE',
    `display_name` VARCHAR(100) NULL,
    CONSTRAINT `fk_friend_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_friend_friend` FOREIGN KEY (`friend_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `chat` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `from_user` INT NOT NULL,
    `to_user` INT NOT NULL,
    `message` LONGTEXT NOT NULL,
    `files` LONGTEXT NOT NULL,
    `status` VARCHAR(30) DEFAULT 'SENT',
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,
    CONSTRAINT `fk_chat_from` FOREIGN KEY (`from_user`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_chat_to` FOREIGN KEY (`to_user`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 2. Configure Credentials
Update your local database password in `src/java/hibernate.cfg.xml`:
```xml
<property name="hibernate.connection.username">root</property>
<property name="hibernate.connection.password">YOUR_MYSQL_PASSWORD</property>
```

### 3. Open and Build in NetBeans
1. Open NetBeans.
2. Select `File -> Open Project...` and choose the `ChatApp` folder.
3. Clean and build the project (`Shift + F11` or right-click project -> Clean and Build).
4. Run the project (`F6` or right-click project -> Run). NetBeans will start the Tomcat or Glassfish instance.
5. The API is hosted at: `http://localhost:8080/ChatApp`
6. The WebSocket hub is located at: `ws://localhost:8080/ChatApp/socket/{userId}`

---

> [!WARNING]
> Do not delete the `.jar` files inside the `lib/` directory! They contain crucial libraries required by NetBeans to build and deploy the web application.
