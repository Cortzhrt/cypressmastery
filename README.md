# **Sauce Demo Website Automation with Cypress 🚀**

This automation project tests the **Sauce Demo Website** login functionality using **Cypress**. It covers both successful and failed login scenarios and supports **headless** and **headed** modes. 🌐

## **Table of Contents 📚**
1. Installation
2. Running the Tests
   - Headless Mode
   - Headed Mode
3. Features
4. Test Details
   - Successful Login Test
   - Failed Login Test

---

## **Installation 🛠️**

### 1. **Create Project Folder**

- **Windows:** Create a folder named `Cypress-Projects` on your Desktop.
- **Mac/Linux:** Run `mkdir ~/Desktop/Cypress-Projects` in the terminal.

### 2. **Clone the Repository**

```bash
cd ~/Desktop/Cypress-Projects
git clone https://github.com/your-repository/cypress-saucedemo.git
```

### 3. **Install Dependencies**

```bash
cd cypress-saucedemo
npm install
```

---

## **Running the Tests 🏃‍♂️**

### **Headless Mode 🧑‍💻** (Faster Execution)

Run the login test in headless mode:

```bash
npm run test:headless:login
```

### **Headed Mode 🖥️** (With Browser UI)

Run the login test in headed mode:

```bash
npm run test:headed:login
```

---

## **Features ✨**

- **Login Test (Success):** Automates login with valid credentials (`standard_user` / `secret_sauce`).
- **Login Test (Failure):** Automates login with invalid credentials and verifies the error message.
- **Headless Mode:** Run tests without opening the browser window.
- **Headed Mode:** Run tests with the browser UI open for debugging.
- **URL & Visibility Validation:** Ensures successful login and verifies error messages on failed login.

---

## **Test Details 📋**

### **Test Case 1: Successful Login to Sauce Demo**

- **Purpose:** Verify login functionality using valid credentials.
- **Steps:**
  1. Visit `https://saucedemo.com`.
  2. Enter username (`standard_user`) and password (`secret_sauce`).
  3. Click the login button.
  4. Verify "Swag Labs" text and check URL for `inventory`.
  
- **Expected Results:**
  - User should be redirected to the inventory page.
  - "Swag Labs" should be visible, and the URL should contain `inventory`.

---

### **Test Case 2: Failed Login to Sauce Demo**

- **Purpose:** Verify the error message when invalid credentials are used.
- **Steps:**
  1. Visit `https://saucedemo.com`.
  2. Enter an invalid username (`randomdroprateup`) and valid password (`secret_sauce`).
  3. Click the login button.
  4. Verify the error message: "Epic sadface: Username and password do not match any user in this service."
  
- **Expected Results:**
  - The error message "Epic sadface: Username and password do not match any user in this service" should be visible.
  
