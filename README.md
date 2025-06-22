# 🐳 How to Run the Docker Image and Access the Source Code (Windows Version)

Follow these steps in **PowerShell** or **Command Prompt** to load, run, and explore the source code inside the Docker container.

---

## 1. Load the Docker image

If you received a `.tar` file (e.g., `backend.tar`), run:

```powershell
docker load -i backend.tar
```

---

## 2. Run the container with terminal access

> Replace `backend-image-name` with the actual image name. You can check the name using:

```powershell
docker run -it --name my-backend-container backend-image-name sh
```

```powershell
docker images
```

---

## 3. Navigate to the project directory

Once inside the container shell:

```bash
cd /app
```

List and read files:

```bash
ls -la
cat src/server.js
```

---

## 4. (Optional) Run the application manually

Inside the container, you can run the server with:

```bash
node dist/server.js
```

---

## 5. (Alternative) Run the container in the background with port mapping

Exit the container and run this command to start it as a background service:

```powershell
docker run -d -p 5000:5000 backend-image-name
```

You should now be able to access the backend at:

```
http://localhost:5000
```

---
