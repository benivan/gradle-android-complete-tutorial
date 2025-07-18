# Complete Gradle Tutorial for Android Development

> **A comprehensive guide covering Gradle from beginner to expert level for Android developers**

---

## Table of Contents

1. [Introduction & Fundamentals](#1-introduction--fundamentals)
   - [What is Gradle?](#what-is-gradle)
   - [Gradle vs Other Build Systems](#gradle-vs-other-build-systems)
   - [Installation and Setup](#installation-and-setup)
   - [Essential Terminology](#essential-terminology)

2. [Basic Gradle Concepts](#2-basic-gradle-concepts)
   - [Build Scripts and DSL](#build-scripts-and-dsl)
   - [Projects and Tasks](#projects-and-tasks)
   - [Dependencies and Repositories](#dependencies-and-repositories)
   - [Gradle Wrapper](#gradle-wrapper)

3. [Android-Specific Gradle Configuration](#3-android-specific-gradle-configuration)
   - [Android Gradle Plugin](#android-gradle-plugin)
   - [Build Types and Product Flavors](#build-types-and-product-flavors)
   - [Manifest Merging](#manifest-merging)
   - [Resource Processing](#resource-processing)
   - [ProGuard/R8 Configuration](#proguardr8-configuration)

4. [Intermediate Topics](#4-intermediate-topics)
   - [Multi-Module Projects](#multi-module-projects)
   - [Custom Tasks and Plugins](#custom-tasks-and-plugins)
   - [Build Variants and Configurations](#build-variants-and-configurations)
   - [Testing Configuration](#testing-configuration)
   - [Signing and Publishing](#signing-and-publishing)

5. [Advanced Topics](#5-advanced-topics)
   - [Custom Plugin Development](#custom-plugin-development)
   - [Advanced Scripting Techniques](#advanced-scripting-techniques)
   - [Build Logic Organization](#build-logic-organization)
   - [Composite Builds](#composite-builds)
   - [Gradle Properties and Configuration](#gradle-properties-and-configuration)

6. [Expert-Level Techniques](#6-expert-level-techniques)
   - [Performance Optimization Strategies](#performance-optimization-strategies)
   - [Custom Build Logic Implementation](#custom-build-logic-implementation)
   - [CI/CD Integration](#cicd-integration)
   - [Advanced Dependency Management](#advanced-dependency-management)
   - [Build Caching Strategies](#build-caching-strategies)

7. [Performance Optimization](#7-performance-optimization)
   - [Build Performance Analysis](#build-performance-analysis)
   - [Caching Strategies](#caching-strategies)
   - [Parallel Execution](#parallel-execution)
   - [Memory and Resource Optimization](#memory-and-resource-optimization)

8. [Cross-Platform Integration](#8-cross-platform-integration)
   - [Flutter-Gradle Integration](#flutter-gradle-integration)
   - [React Native Considerations](#react-native-considerations)
   - [Platform-Specific Configurations](#platform-specific-configurations)
   - [Cross-Platform Dependency Management](#cross-platform-dependency-management)

9. [Troubleshooting & Best Practices](#9-troubleshooting--best-practices)
   - [Common Build Issues](#common-build-issues)
   - [Debugging Techniques](#debugging-techniques)
   - [Industry Best Practices](#industry-best-practices)
   - [Comprehensive Troubleshooting Guide](#comprehensive-troubleshooting-guide)

10. [Reference Section](#10-reference-section)
    - [Gradle DSL Reference](#gradle-dsl-reference)
    - [Quick Reference Tables](#quick-reference-tables)
    - [Cheat Sheets](#cheat-sheets)
    - [Version Compatibility Guide](#version-compatibility-guide)
    - [Migration Guides](#migration-guides)

---

## Document Conventions

### Code Block Formatting
```gradle
// Example Gradle code will be formatted like this
android {
    compileSdk 34
    // Configuration details...
}
```

### Important Notes
> **💡 Tip:** Helpful tips and best practices will be highlighted like this

> **⚠️ Warning:** Important warnings and potential pitfalls will be marked like this

> **📝 Note:** Additional information and context will be provided like this

### Example Structure
Each concept will follow this structure:
- **Concept Introduction**
- **Code Examples**
- **Explanation**
- **Common Use Cases**
- **Best Practices**
- **Troubleshooting**

---

## 1. Introduction & Fundamentals

### What is Gradle?

Gradle is a powerful, flexible build automation tool that has become the standard build system for Android development. At its core, Gradle is a general-purpose build tool that can automate the building, testing, publishing, and deployment of software packages or other types of projects.

#### Why Gradle for Android?

Gradle was chosen by Google as the official build system for Android development because of its:

- **Flexibility**: Gradle's domain-specific language (DSL) allows for highly customizable build configurations
- **Performance**: Incremental builds, build caching, and parallel execution make builds faster
- **Dependency Management**: Sophisticated dependency resolution and management capabilities
- **Plugin Ecosystem**: Rich ecosystem of plugins for various development needs
- **Multi-Project Support**: Excellent support for complex, multi-module projects

#### How Gradle Works

Gradle operates on the concept of a **Directed Acyclic Graph (DAG)** of tasks. When you run a build:

1. **Initialization Phase**: Gradle determines which projects are part of the build
2. **Configuration Phase**: Gradle configures the projects and creates a task graph
3. **Execution Phase**: Gradle executes the selected tasks in the correct order

```gradle
// Example: Simple Android app build.gradle file
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'com.example.myapp'
    compileSdk 34

    defaultConfig {
        applicationId "com.example.myapp"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0"
    }
}

dependencies {
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
}
```

> **💡 Tip:** Gradle builds are declarative - you describe what you want, not how to do it. Gradle figures out the execution order based on task dependencies.

### Gradle vs Other Build Systems

Understanding how Gradle compares to other build systems helps appreciate its advantages and when to use it.

#### Gradle vs Maven

| Feature | Gradle | Maven |
|---------|--------|-------|
| **Configuration** | Groovy/Kotlin DSL (flexible) | XML (verbose, rigid) |
| **Performance** | Incremental builds, caching | Full rebuilds typically required |
| **Dependency Management** | Advanced conflict resolution | Basic dependency management |
| **Customization** | Highly customizable | Limited customization |
| **Learning Curve** | Moderate to steep | Moderate |
| **Android Support** | Native, official support | Third-party plugins |

```gradle
// Gradle - Concise and readable
dependencies {
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    testImplementation 'junit:junit:4.13.2'
}
```

```xml
<!-- Maven - Verbose XML -->
<dependencies>
    <dependency>
        <groupId>com.squareup.retrofit2</groupId>
        <artifactId>retrofit</artifactId>
        <version>2.9.0</version>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.13.2</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

#### Gradle vs Ant

| Feature | Gradle | Ant |
|---------|--------|-----|
| **Dependency Management** | Built-in, sophisticated | Manual or via Ivy |
| **Convention over Configuration** | Strong conventions | Requires explicit configuration |
| **Incremental Builds** | Built-in support | Manual implementation |
| **IDE Integration** | Excellent | Basic |
| **Maintenance** | Lower maintenance | High maintenance |

#### Gradle vs Bazel

| Feature | Gradle | Bazel |
|---------|--------|-------|
| **Target Audience** | General purpose, Android-focused | Large-scale, polyglot projects |
| **Learning Curve** | Moderate | Steep |
| **Build Speed** | Fast with caching | Very fast for large projects |
| **Android Integration** | Native, seamless | Requires additional setup |
| **Community** | Large Android community | Smaller, enterprise-focused |

> **📝 Note:** While Bazel can be faster for very large projects, Gradle's Android integration and ecosystem make it the practical choice for most Android development.

### Installation and Setup

#### Prerequisites

Before installing Gradle, ensure you have:

- **Java Development Kit (JDK) 8 or higher** (JDK 11+ recommended)
- **Android Studio** (includes Gradle automatically)
- **Command Line Tools** (optional, for command-line builds)

#### Method 1: Android Studio (Recommended)

Android Studio comes with Gradle pre-installed and automatically manages Gradle versions:

1. **Download Android Studio** from [developer.android.com](https://developer.android.com/studio)
2. **Install Android Studio** following the setup wizard
3. **Create a new project** - Gradle is automatically configured

```gradle
// gradle/wrapper/gradle-wrapper.properties
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-8.4-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
```

#### Method 2: Manual Installation

For command-line development or CI/CD environments:

**On macOS (using Homebrew):**
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Gradle
brew install gradle

# Verify installation
gradle --version
```

**On Windows:**
```powershell
# Using Chocolatey
choco install gradle

# Using Scoop
scoop install gradle

# Verify installation
gradle --version
```

**On Linux (Ubuntu/Debian):**
```bash
# Using SDKMAN (recommended)
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk install gradle

# Using package manager
sudo apt update
sudo apt install gradle

# Verify installation
gradle --version
```

#### Method 3: Gradle Wrapper (Project-Specific)

The Gradle Wrapper ensures consistent Gradle versions across different environments:

```bash
# Generate wrapper files (if not present)
gradle wrapper

# Use wrapper instead of global Gradle
./gradlew build    # On macOS/Linux
gradlew.bat build  # On Windows
```

> **💡 Tip:** Always use the Gradle Wrapper (`./gradlew`) in projects to ensure consistent builds across different machines and environments.

#### Verifying Installation

Check your Gradle installation:

```bash
gradle --version
# or
./gradlew --version
```

Expected output:
```
Gradle 8.4

Build time:   2023-10-04 20:52:13 UTC
Revision:     e9251e572c9bd1d01e503a0dfdf43aedalapac4

Kotlin:       1.9.10
Groovy:       3.0.17
Ant:          Apache Ant(TM) version 1.10.13
JVM:          17.0.7 (Eclipse Adoptium 17.0.7+7)
OS:           Mac OS X 13.5.2 aarch64
```

### Essential Terminology

Understanding Gradle terminology is crucial for effective Android development. Here are the key concepts:

#### Build Script
The `build.gradle` (or `build.gradle.kts` for Kotlin DSL) file that defines how your project should be built.

```gradle
// build.gradle - Project-level
plugins {
    id 'com.android.application' version '8.1.2' apply false
}

// build.gradle - Module-level (app)
plugins {
    id 'com.android.application'
}

android {
    compileSdk 34
    // Android-specific configuration
}
```

#### Project
A Gradle project represents a component that can be built, such as an Android app, library, or test suite.

- **Root Project**: The top-level project containing `settings.gradle`
- **Subprojects**: Individual modules (app, library modules)

```gradle
// settings.gradle
rootProject.name = "MyAndroidApp"
include ':app'
include ':core'
include ':feature-login'
```

#### Task
A unit of work that Gradle can execute, such as compiling code, running tests, or generating APKs.

```gradle
// Custom task example
task hello {
    doLast {
        println 'Hello, Gradle!'
    }
}

// Android tasks (automatically created)
// - assembleDebug: Build debug APK
// - assembleRelease: Build release APK
// - test: Run unit tests
// - connectedAndroidTest: Run instrumented tests
```

#### Plugin
Extensions that add functionality to Gradle builds. Android development relies heavily on plugins.

```gradle
plugins {
    id 'com.android.application'        // Android App Plugin
    id 'com.android.library'           // Android Library Plugin
    id 'org.jetbrains.kotlin.android'  // Kotlin Android Plugin
    id 'kotlin-kapt'                   // Kotlin Annotation Processing
    id 'dagger.hilt.android.plugin'    // Hilt Dependency Injection
}
```

#### Dependencies
External libraries or modules that your project needs to compile and run.

```gradle
dependencies {
    // Implementation: Available at compile and runtime
    implementation 'androidx.core:core-ktx:1.12.0'
    
    // API: Exposed to consumers of this module
    api 'com.squareup.retrofit2:retrofit:2.9.0'
    
    // Test dependencies
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    
    // Compile-only: Available only at compile time
    compileOnly 'javax.annotation:javax.annotation-api:1.3.2'
}
```

#### Configuration
A named set of dependencies and artifacts. Common Android configurations:

- **implementation**: Runtime and compile-time dependencies
- **api**: Dependencies exposed to consumers
- **testImplementation**: Test-only dependencies
- **debugImplementation**: Debug build-only dependencies
- **releaseImplementation**: Release build-only dependencies

#### Repository
A location where Gradle looks for dependencies.

```gradle
repositories {
    google()                 // Google's Maven repository
    mavenCentral()          // Maven Central repository
    gradlePluginPortal()    // Gradle Plugin Portal
    
    // Custom repositories
    maven {
        url 'https://jitpack.io'
    }
}
```

#### Build Types
Different versions of your app (debug, release) with different configurations.

```gradle
android {
    buildTypes {
        debug {
            debuggable true
            applicationIdSuffix ".debug"
            versionNameSuffix "-DEBUG"
        }
        
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

#### Product Flavors
Different versions of your app for different markets, features, or configurations.

```gradle
android {
    flavorDimensions "version"
    
    productFlavors {
        free {
            dimension "version"
            applicationIdSuffix ".free"
            versionNameSuffix "-free"
        }
        
        paid {
            dimension "version"
            applicationIdSuffix ".paid"
            versionNameSuffix "-paid"
        }
    }
}
```

#### Build Variants
Combinations of build types and product flavors:
- `freeDebug`, `freeRelease`, `paidDebug`, `paidRelease`

#### Gradle Wrapper
Scripts that download and run a specific version of Gradle, ensuring consistent builds.

```
project/
├── gradle/
│   └── wrapper/
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew          # Unix/macOS wrapper script
├── gradlew.bat      # Windows wrapper script
└── build.gradle
```

#### DSL (Domain Specific Language)
Gradle's configuration language, available in Groovy or Kotlin.

```gradle
// Groovy DSL (build.gradle)
android {
    compileSdk 34
    defaultConfig {
        minSdk 24
    }
}
```

```kotlin
// Kotlin DSL (build.gradle.kts)
android {
    compileSdk = 34
    defaultConfig {
        minSdk = 24
    }
}
```

> **⚠️ Warning:** Don't mix Groovy and Kotlin DSL in the same project. Choose one and stick with it for consistency.

#### Common Gradle Commands

```bash
# Build the project
./gradlew build

# Clean build artifacts
./gradlew clean

# Assemble debug APK
./gradlew assembleDebug

# Run unit tests
./gradlew test

# Run instrumented tests
./gradlew connectedAndroidTest

# List all available tasks
./gradlew tasks

# Get project information
./gradlew projects

# Show dependency tree
./gradlew dependencies
```

> **💡 Tip:** Use `./gradlew tasks --all` to see all available tasks, including those added by plugins.

This foundational knowledge prepares you for the more advanced Gradle concepts covered in the following sections. Understanding these terms and concepts is essential for effective Android development with Gradle.

---

## 2. Basic Gradle Concepts

### Build Scripts and DSL

Gradle build scripts are the heart of your build configuration. They define how your project should be built, what dependencies it needs, and what tasks should be executed. Gradle supports two Domain Specific Languages (DSLs): Groovy and Kotlin.

#### Understanding Build Scripts

Every Gradle project has at least one build script, typically named `build.gradle` (Groovy DSL) or `build.gradle.kts` (Kotlin DSL). In Android projects, you'll typically have:

1. **Project-level build script** (`build.gradle` in root directory)
2. **Module-level build scripts** (`build.gradle` in each module directory)

```gradle
// Project-level build.gradle (Groovy DSL)
buildscript {
    ext.kotlin_version = "1.9.10"
    dependencies {
        classpath 'com.android.tools.build:gradle:8.1.2'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}

plugins {
    id 'com.android.application' version '8.1.2' apply false
    id 'com.android.library' version '8.1.2' apply false
    id 'org.jetbrains.kotlin.android' version '1.9.10' apply false
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

```gradle
// Module-level build.gradle (app module)
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'com.example.myapp'
    compileSdk 34

    defaultConfig {
        applicationId "com.example.myapp"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    
    kotlinOptions {
        jvmTarget = '1.8'
    }
}

dependencies {
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.10.0'
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
}
```

#### Groovy DSL vs Kotlin DSL

**Groovy DSL (build.gradle):**
- More concise syntax
- Dynamic typing
- Established ecosystem
- Better IDE support in older versions

**Kotlin DSL (build.gradle.kts):**
- Type-safe configuration
- Better IDE support (auto-completion, refactoring)
- Compile-time error checking
- Consistent with Kotlin development

```kotlin
// Kotlin DSL example (build.gradle.kts)
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.example.myapp"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.myapp"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    
    kotlinOptions {
        jvmTarget = "1.8"
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.10.0")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
}
```

> **💡 Tip:** Choose one DSL and stick with it throughout your project. Kotlin DSL is recommended for new projects due to better IDE support and type safety.

#### DSL Syntax Fundamentals

**Configuration Blocks:**
Configuration blocks define settings for different aspects of your build:

```gradle
android {
    // Android-specific configuration
    compileSdk 34
    
    defaultConfig {
        // Default configuration for all build variants
        minSdk 24
        targetSdk 34
    }
    
    buildTypes {
        // Different build configurations
        debug {
            debuggable true
        }
        release {
            minifyEnabled true
        }
    }
}
```

**Method Calls and Property Assignment:**

```gradle
// Groovy DSL - Multiple ways to set properties
android {
    compileSdk 34                    // Method call
    compileSdk = 34                  // Property assignment
    setCompileSdk(34)               // Explicit method call
    
    defaultConfig {
        applicationId "com.example.app"     // Method call
        applicationId = "com.example.app"   // Property assignment
        setApplicationId("com.example.app") // Explicit method call
    }
}
```

**Closures and Lambdas:**

```gradle
// Groovy DSL - Using closures
dependencies {
    implementation('com.squareup.retrofit2:retrofit:2.9.0') {
        exclude group: 'com.squareup.okhttp3', module: 'okhttp'
    }
}

// Configuration with closure
android {
    packagingOptions {
        pickFirst '**/libc++_shared.so'
        exclude 'META-INF/DEPENDENCIES'
    }
}
```

```kotlin
// Kotlin DSL - Using lambdas
dependencies {
    implementation("com.squareup.retrofit2:retrofit:2.9.0") {
        exclude(group = "com.squareup.okhttp3", module = "okhttp")
    }
}

// Configuration with lambda
android {
    packagingOptions {
        pickFirst("**/libc++_shared.so")
        exclude("META-INF/DEPENDENCIES")
    }
}
```

#### Variables and Extra Properties

**Using Variables:**

```gradle
// Groovy DSL
def kotlinVersion = '1.9.10'
def compileSdkVersion = 34

android {
    compileSdk compileSdkVersion
}

dependencies {
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlinVersion"
}
```

```kotlin
// Kotlin DSL
val kotlinVersion = "1.9.10"
val compileSdkVersion = 34

android {
    compileSdk = compileSdkVersion
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib:$kotlinVersion")
}
```

**Extra Properties (ext):**

```gradle
// Project-level build.gradle
ext {
    kotlin_version = '1.9.10'
    retrofit_version = '2.9.0'
    room_version = '2.6.0'
    
    // Version codes and names
    version_code = 1
    version_name = '1.0.0'
    
    // SDK versions
    compile_sdk = 34
    min_sdk = 24
    target_sdk = 34
}

// Module-level build.gradle
android {
    compileSdk rootProject.ext.compile_sdk
    
    defaultConfig {
        minSdk rootProject.ext.min_sdk
        targetSdk rootProject.ext.target_sdk
        versionCode rootProject.ext.version_code
        versionName rootProject.ext.version_name
    }
}

dependencies {
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation "com.squareup.retrofit2:retrofit:$retrofit_version"
    implementation "androidx.room:room-runtime:$room_version"
}
```

#### Conditional Logic

```gradle
// Groovy DSL - Conditional configuration
android {
    buildTypes {
        debug {
            debuggable true
            if (project.hasProperty('enableR8')) {
                minifyEnabled true
            }
        }
        
        release {
            minifyEnabled true
            // Different ProGuard files based on flavor
            if (project.hasProperty('flavor') && project.flavor == 'pro') {
                proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules-pro.pro'
            } else {
                proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            }
        }
    }
}

// Conditional dependencies
dependencies {
    implementation 'androidx.core:core-ktx:1.12.0'
    
    if (project.hasProperty('useRetrofit')) {
        implementation 'com.squareup.retrofit2:retrofit:2.9.0'
        implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    } else {
        implementation 'com.squareup.okhttp3:okhttp:4.12.0'
    }
}
```

> **⚠️ Warning:** Avoid complex conditional logic in build scripts as it can make builds harder to understand and debug. Consider using product flavors or build variants instead.

### Projects and Tasks

Understanding the relationship between projects and tasks is fundamental to mastering Gradle. Every Gradle build consists of one or more projects, and each project consists of one or more tasks.

#### Project Hierarchy

**Single Project:**
```
MyApp/
├── build.gradle
├── settings.gradle
└── src/
```

**Multi-Project (Typical Android App):**
```
MyApp/
├── build.gradle                 (root project)
├── settings.gradle
├── app/
│   ├── build.gradle            (app module)
│   └── src/
├── core/
│   ├── build.gradle            (library module)
│   └── src/
└── feature-login/
    ├── build.gradle            (feature module)
    └── src/
```

**Settings File (settings.gradle):**

```gradle
// settings.gradle
rootProject.name = 'MyAndroidApp'

include ':app'
include ':core'
include ':feature-login'
include ':feature-profile'

// Optional: Custom project directories
project(':core').projectDir = new File('libraries/core')
```

#### Understanding Tasks

Tasks are the basic unit of work in Gradle. Every action that Gradle performs is defined by a task.

**Viewing Available Tasks:**

```bash
# List all tasks
./gradlew tasks

# List all tasks including hidden ones
./gradlew tasks --all

# List tasks for specific group
./gradlew tasks --group="build"
```

**Common Android Tasks:**

```bash
# Build tasks
./gradlew assemble          # Build all variants
./gradlew assembleDebug     # Build debug variant
./gradlew assembleRelease   # Build release variant

# Clean tasks
./gradlew clean             # Delete build directory
./gradlew cleanBuildCache   # Clean build cache

# Test tasks
./gradlew test              # Run unit tests
./gradlew testDebug         # Run debug unit tests
./gradlew connectedAndroidTest  # Run instrumented tests

# Verification tasks
./gradlew check             # Run all checks
./gradlew lint              # Run Android lint
./gradlew lintDebug         # Run lint for debug variant

# Install tasks
./gradlew installDebug      # Install debug APK
./gradlew uninstallAll      # Uninstall all variants
```

#### Task Dependencies and Execution Order

Tasks can depend on other tasks, creating a dependency graph:

```gradle
// Custom task example
task compileCustomCode {
    doLast {
        println "Compiling custom code..."
    }
}

task packageCustomCode(dependsOn: compileCustomCode) {
    doLast {
        println "Packaging custom code..."
    }
}

task deployCustomCode(dependsOn: packageCustomCode) {
    doLast {
        println "Deploying custom code..."
    }
}

// Android tasks automatically have dependencies
// assembleDebug depends on:
//   - compileDebugJavaWithJavac
//   - processDebugResources
//   - mergeDebugResources
//   - etc.
```

**Task Execution Phases:**

1. **Initialization**: Gradle determines which projects participate in the build
2. **Configuration**: Build scripts are executed and task graph is created
3. **Execution**: Selected tasks are executed in dependency order

#### Creating Custom Tasks

**Simple Custom Task:**

```gradle
// Groovy DSL
task hello {
    doLast {
        println 'Hello from Gradle!'
    }
}

task printVersions {
    doLast {
        println "Kotlin version: $kotlin_version"
        println "Compile SDK: $android.compileSdkVersion"
        println "Build tools: $android.buildToolsVersion"
    }
}
```

```kotlin
// Kotlin DSL
tasks.register("hello") {
    doLast {
        println("Hello from Gradle!")
    }
}

tasks.register("printVersions") {
    doLast {
        println("Kotlin version: ${extra["kotlin_version"]}")
        println("Compile SDK: ${android.compileSdkVersion}")
    }
}
```

**Task with Configuration:**

```gradle
task generateBuildInfo {
    def outputDir = file("$buildDir/generated/buildinfo")
    
    inputs.property("versionName", android.defaultConfig.versionName)
    inputs.property("versionCode", android.defaultConfig.versionCode)
    outputs.dir(outputDir)
    
    doLast {
        outputDir.mkdirs()
        def buildInfoFile = new File(outputDir, "BuildInfo.java")
        buildInfoFile.text = """
package com.example.buildinfo;

public class BuildInfo {
    public static final String VERSION_NAME = "${android.defaultConfig.versionName}";
    public static final int VERSION_CODE = ${android.defaultConfig.versionCode};
    public static final String BUILD_TIME = "${new Date()}";
}
"""
    }
}

// Make the task run before compilation
android.applicationVariants.all { variant ->
    variant.registerJavaGeneratingTask(generateBuildInfo, generateBuildInfo.outputs.files)
}
```

**Task Types:**

```gradle
// Copy task
task copyAssets(type: Copy) {
    from 'src/main/assets-dev'
    into 'src/main/assets'
    include '**/*.json'
}

// Delete task
task cleanAssets(type: Delete) {
    delete 'src/main/assets'
}

// Exec task (run external commands)
task runTests(type: Exec) {
    commandLine 'python', 'scripts/run_tests.py'
}

// Zip task
task createDistribution(type: Zip) {
    from 'build/outputs/apk'
    archiveFileName = 'app-distribution.zip'
    destinationDirectory = file('dist')
}
```

#### Task Configuration and Lifecycle

**Task Configuration:**

```gradle
// Configure existing tasks
tasks.named('test') {
    useJUnitPlatform()
    testLogging {
        events "passed", "skipped", "failed"
    }
}

// Configure all tasks of a type
tasks.withType(Test) {
    maxParallelForks = Runtime.runtime.availableProcessors().intdiv(2) ?: 1
}

// Configure Android tasks
android.applicationVariants.all { variant ->
    def variantName = variant.name.capitalize()
    
    task("generate${variantName}BuildConfig") {
        doLast {
            // Generate build-specific configuration
        }
    }
    
    // Make it run before the variant's build
    variant.preBuild.dependsOn("generate${variantName}BuildConfig")
}
```

**Task Inputs and Outputs:**

```gradle
task processData {
    // Declare inputs
    inputs.files fileTree('src/data')
    inputs.property('processingMode', project.findProperty('mode') ?: 'default')
    
    // Declare outputs
    outputs.dir "$buildDir/processed-data"
    outputs.cacheIf { true } // Enable caching
    
    doLast {
        // Task implementation
        file("$buildDir/processed-data").mkdirs()
        // Process data files...
    }
}
```

> **💡 Tip:** Properly declaring inputs and outputs enables Gradle's incremental build and caching features, significantly improving build performance.

#### Project Configuration

**Configuring All Projects:**

```gradle
// Root build.gradle
allprojects {
    repositories {
        google()
        mavenCentral()
    }
    
    // Apply common configuration
    tasks.withType(JavaCompile) {
        options.encoding = 'UTF-8'
    }
}

subprojects {
    // Configuration for all subprojects (modules)
    apply plugin: 'kotlin-android'
    
    android {
        compileSdkVersion 34
        
        defaultConfig {
            minSdkVersion 24
            targetSdkVersion 34
        }
        
        compileOptions {
            sourceCompatibility JavaVersion.VERSION_1_8
            targetCompatibility JavaVersion.VERSION_1_8
        }
        
        kotlinOptions {
            jvmTarget = '1.8'
        }
    }
}
```

**Project-Specific Configuration:**

```gradle
// Configure specific project
project(':app') {
    dependencies {
        implementation project(':core')
        implementation project(':feature-login')
    }
}

project(':core') {
    apply plugin: 'com.android.library'
    
    android {
        // Library-specific configuration
        buildTypes {
            release {
                consumerProguardFiles 'consumer-rules.pro'
            }
        }
    }
}
```

### Dependencies and Repositories

Dependency management is one of Gradle's most powerful features. It automatically downloads and manages external libraries, handles version conflicts, and ensures your project has all the required dependencies.

#### Understanding Dependency Configurations

Gradle uses configurations to group dependencies by their intended use:

**Main Configurations:**

```gradle
dependencies {
    // Available at compile time and runtime
    implementation 'androidx.core:core-ktx:1.12.0'
    
    // Exposed to consumers of this module (use sparingly)
    api 'com.squareup.retrofit2:retrofit:2.9.0'
    
    // Only available at compile time
    compileOnly 'javax.annotation:javax.annotation-api:1.3.2'
    
    // Only available at runtime
    runtimeOnly 'com.h2database:h2:2.2.224'
    
    // Test dependencies
    testImplementation 'junit:junit:4.13.2'
    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
    
    // Android instrumented test dependencies
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
}
```

**Build Variant Specific Dependencies:**

```gradle
dependencies {
    // Debug-only dependencies
    debugImplementation 'com.squareup.leakcanary:leakcanary-android:2.12'
    debugImplementation 'com.facebook.flipper:flipper:0.212.0'
    
    // Release-only dependencies
    releaseImplementation 'com.google.firebase:firebase-crashlytics:18.6.0'
    
    // Flavor-specific dependencies (if you have flavors)
    freeImplementation 'com.google.android.gms:play-services-ads:22.6.0'
    paidImplementation 'com.example:premium-features:1.0.0'
}
```

**Configuration Hierarchy:**

```
api
├── implementation
│   ├── debugImplementation
│   ├── releaseImplementation
│   └── [flavor]Implementation
├── compileOnly
│   ├── debugCompileOnly
│   └── releaseCompileOnly
├── runtimeOnly
│   ├── debugRuntimeOnly
│   └── releaseRuntimeOnly
└── testImplementation
    ├── testCompileOnly
    └── testRuntimeOnly
```

#### Dependency Declaration Formats

**Standard Format:**

```gradle
dependencies {
    // Group:Name:Version
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.10.0'
    
    // With classifier
    implementation 'org.apache.httpcomponents:httpclient:4.5.14:android'
    
    // With type
    implementation 'com.example:library:1.0@aar'
}
```

**Map Format:**

```gradle
dependencies {
    implementation group: 'androidx.appcompat', name: 'appcompat', version: '1.6.1'
    implementation group: 'com.google.android.material', name: 'material', version: '1.10.0'
    
    // With additional attributes
    implementation(
        group: 'com.example',
        name: 'library',
        version: '1.0',
        classifier: 'sources',
        ext: 'jar'
    )
}
```

**File Dependencies:**

```gradle
dependencies {
    // Single JAR file
    implementation files('libs/custom-library.jar')
    
    // Multiple JAR files
    implementation files('libs/lib1.jar', 'libs/lib2.jar')
    
    // All JARs in a directory
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    
    // With exclusions
    implementation fileTree(dir: 'libs', include: ['*.jar'], exclude: ['*-test.jar'])
}
```

**Project Dependencies:**

```gradle
dependencies {
    // Depend on another module in the same project
    implementation project(':core')
    implementation project(':feature-login')
    
    // With configuration
    implementation project(path: ':core', configuration: 'default')
}
```

#### Repository Configuration

Repositories tell Gradle where to find dependencies:

```gradle
repositories {
    // Google's Maven repository (required for Android dependencies)
    google()
    
    // Maven Central repository
    mavenCentral()
    
    // Gradle Plugin Portal (for plugins)
    gradlePluginPortal()
    
    // JCenter (deprecated, but still used by some libraries)
    jcenter() {
        content {
            // Only allow specific groups from JCenter
            includeGroup "org.jetbrains.trove4j"
        }
    }
    
    // Custom Maven repositories
    maven {
        url 'https://jitpack.io'
    }
    
    maven {
        url 'https://maven.fabric.io/public'
    }
    
    // Repository with credentials
    maven {
        url 'https://private-repo.company.com/maven'
        credentials {
            username = project.findProperty('repoUsername') ?: System.getenv('REPO_USERNAME')
            password = project.findProperty('repoPassword') ?: System.getenv('REPO_PASSWORD')
        }
    }
    
    // Local Maven repository
    mavenLocal()
    
    // Flat directory repository
    flatDir {
        dirs 'libs'
    }
}
```

**Repository Order Matters:**

```gradle
repositories {
    // Gradle searches repositories in order
    google()        // Searched first
    mavenCentral()  // Searched second
    jcenter()       // Searched last
}
```

> **💡 Tip:** Place the most commonly used repositories first to improve dependency resolution speed.

#### Version Management

**Version Catalogs (Gradle 7.0+):**

Create `gradle/libs.versions.toml`:

```toml
[versions]
kotlin = "1.9.10"
compose = "1.5.4"
retrofit = "2.9.0"
room = "2.6.0"

[libraries]
kotlin-stdlib = { group = "org.jetbrains.kotlin", name = "kotlin-stdlib", version.ref = "kotlin" }
compose-ui = { group = "androidx.compose.ui", name = "ui", version.ref = "compose" }
compose-material3 = { group = "androidx.compose.material3", name = "material3", version.ref = "compose" }
retrofit-core = { group = "com.squareup.retrofit2", name = "retrofit", version.ref = "retrofit" }
retrofit-gson = { group = "com.squareup.retrofit2", name = "converter-gson", version.ref = "retrofit" }
room-runtime = { group = "androidx.room", name = "room-runtime", version.ref = "room" }
room-compiler = { group = "androidx.room", name = "room-compiler", version.ref = "room" }

[bundles]
compose = ["compose-ui", "compose-material3"]
retrofit = ["retrofit-core", "retrofit-gson"]

[plugins]
android-application = { id = "com.android.application", version = "8.1.2" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
```

Use in build.gradle:

```gradle
dependencies {
    implementation libs.kotlin.stdlib
    implementation libs.bundles.compose
    implementation libs.bundles.retrofit
    implementation libs.room.runtime
    kapt libs.room.compiler
}
```

**Traditional Version Management:**

```gradle
// Project-level build.gradle
ext {
    versions = [
        kotlin: '1.9.10',
        compose: '1.5.4',
        retrofit: '2.9.0',
        room: '2.6.0'
    ]
    
    deps = [
        kotlin: [
            stdlib: "org.jetbrains.kotlin:kotlin-stdlib:${versions.kotlin}"
        ],
        compose: [
            ui: "androidx.compose.ui:ui:${versions.compose}",
            material3: "androidx.compose.material3:material3:${versions.compose}"
        ],
        retrofit: [
            core: "com.squareup.retrofit2:retrofit:${versions.retrofit}",
            gson: "com.squareup.retrofit2:converter-gson:${versions.retrofit}"
        ]
    ]
}

// Module-level build.gradle
dependencies {
    implementation deps.kotlin.stdlib
    implementation deps.compose.ui
    implementation deps.compose.material3
    implementation deps.retrofit.core
    implementation deps.retrofit.gson
}
```

#### Dependency Resolution and Conflicts

**Version Conflicts:**

```gradle
dependencies {
    implementation 'com.example:library-a:1.0' // depends on common-lib:2.0
    implementation 'com.example:library-b:1.0' // depends on common-lib:1.5
    
    // Gradle will choose the highest version (2.0) by default
    // You can force a specific version:
    implementation 'com.example:common-lib:2.1'
}
```

**Excluding Transitive Dependencies:**

```gradle
dependencies {
    implementation('com.squareup.retrofit2:retrofit:2.9.0') {
        exclude group: 'com.squareup.okhttp3', module: 'okhttp'
    }
    
    // Exclude all transitive dependencies
    implementation('com.example:library:1.0') {
        transitive = false
    }
    
    // Use a different version of the excluded dependency
    implementation 'com.squareup.okhttp3:okhttp:4.12.0'
}
```

**Forcing Versions:**

```gradle
configurations.all {
    resolutionStrategy {
        // Force specific versions
        force 'com.squareup.okhttp3:okhttp:4.12.0'
        
        // Fail on version conflict
        failOnVersionConflict()
        
        // Cache dynamic versions for 24 hours
        cacheDynamicVersionsFor 24, 'hours'
        
        // Cache changing modules for 0 seconds (always check)
        cacheChangingModulesFor 0, 'seconds'
    }
}
```

**Dependency Insights:**

```bash
# View dependency tree
./gradlew dependencies

# View specific configuration
./gradlew dependencies --configuration implementation

# Find why a dependency is included
./gradlew dependencyInsight --dependency retrofit

# HTML dependency report
./gradlew htmlDependencyReport
```

#### Platform and BOM Dependencies

**Using BOMs (Bill of Materials):**

```gradle
dependencies {
    // Import BOM
    implementation platform('com.google.firebase:firebase-bom:32.7.0')
    implementation platform('androidx.compose:compose-bom:2023.10.01')
    
    // Use dependencies without versions (versions come from BOM)
    implementation 'com.google.firebase:firebase-analytics'
    implementation 'com.google.firebase:firebase-crashlytics'
    implementation 'androidx.compose.ui:ui'
    implementation 'androidx.compose.material3:material3'
}
```

**Creating Custom Platforms:**

```gradle
// In a separate module or build.gradle
plugins {
    id 'java-platform'
}

dependencies {
    constraints {
        api 'com.squareup.retrofit2:retrofit:2.9.0'
        api 'com.squareup.okhttp3:okhttp:4.12.0'
        api 'androidx.room:room-runtime:2.6.0'
    }
}
```

### Gradle Wrapper

The Gradle Wrapper is a script that invokes a declared version of Gradle, downloading it beforehand if necessary. This ensures that anyone can run your project without having to install Gradle manually.

#### Understanding the Wrapper

**Wrapper Files:**

```
project/
├── gradle/
│   └── wrapper/
│       ├── gradle-wrapper.jar      # Wrapper executable JAR
│       └── gradle-wrapper.properties # Wrapper configuration
├── gradlew                         # Unix/macOS wrapper script
├── gradlew.bat                     # Windows wrapper script
└── build.gradle
```

**gradle-wrapper.properties:**

```properties
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-8.4-bin.zip
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
```

#### Setting Up the Wrapper

**Generating Wrapper Files:**

```bash
# Generate wrapper with current Gradle version
gradle wrapper

# Generate wrapper with specific version
gradle wrapper --gradle-version 8.4

# Generate wrapper with specific distribution type
gradle wrapper --gradle-version 8.4 --distribution-type all

# Generate wrapper with custom distribution URL
gradle wrapper --gradle-distribution-url https://services.gradle.org/distributions/gradle-8.4-bin.zip
```

**Distribution Types:**

- **bin**: Contains only Gradle runtime (smaller download)
- **all**: Contains runtime + sources + documentation (larger, better for IDEs)

```properties
# Binary distribution (default)
distributionUrl=https\://services.gradle.org/distributions/gradle-8.4-bin.zip

# Full distribution (recommended for development)
distributionUrl=https\://services.gradle.org/distributions/gradle-8.4-all.zip
```

#### Using the Wrapper

**Basic Commands:**

```bash
# Unix/macOS/Linux
./gradlew build
./gradlew clean
./gradlew assembleDebug

# Windows
gradlew.bat build
gradlew.bat clean
gradlew.bat assembleDebug

# Or simply (if .bat is in PATH)
gradlew build
```

**Wrapper vs Global Gradle:**

```bash
# Using wrapper (recommended)
./gradlew --version
./gradlew build

# Using global Gradle installation
gradle --version
gradle build
```

> **💡 Tip:** Always use the wrapper (`./gradlew`) instead of a global Gradle installation to ensure consistent builds across different environments.

#### Wrapper Configuration

**Customizing Wrapper Properties:**

```properties
# gradle/wrapper/gradle-wrapper.properties

# Distribution configuration
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-8.4-all.zip

# Network settings
networkTimeout=10000
validateDistributionUrl=true

# Storage configuration
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
```

**Environment-Specific Configuration:**

```bash
# Set custom Gradle user home
export GRADLE_USER_HOME=/custom/gradle/home
./gradlew build

# Use different distribution URL
export GRADLE_DISTRIBUTION_URL=https://custom-mirror.com/gradle-8.4-bin.zip
./gradlew build

# Offline mode
./gradlew build --offline
```

#### Wrapper Best Practices

**Version Management:**

```gradle
// gradle/wrapper/gradle-wrapper.properties
# Always specify exact version, not 'latest'
distributionUrl=https\://services.gradle.org/distributions/gradle-8.4-all.zip

# Not recommended:
# distributionUrl=https\://services.gradle.org/distributions/gradle-latest-bin.zip
```

**Security Considerations:**

```properties
# Enable distribution URL validation
validateDistributionUrl=true

# Use HTTPS URLs only
distributionUrl=https\://services.gradle.org/distributions/gradle-8.4-bin.zip

# Verify checksums (Gradle 6.7+)
distributionSha256Sum=3e1af3ae886920c3ac87f7a91f816c0c7c436f276a6eefdb3da152100fef72ae
```

**Team Development:**

```bash
# Update wrapper for entire team
./gradlew wrapper --gradle-version 8.4 --distribution-type all

# Commit wrapper files to version control
git add gradle/wrapper/
git add gradlew gradlew.bat
git commit -m "Update Gradle wrapper to 8.4"
```

**CI/CD Integration:**

```yaml
# GitHub Actions example
- name: Setup Gradle
  uses: gradle/gradle-build-action@v2
  with:
    gradle-version: wrapper

- name: Build with Gradle
  run: ./gradlew build
```

```yaml
# GitLab CI example
build:
  script:
    - chmod +x ./gradlew
    - ./gradlew build
```

#### Wrapper Troubleshooting

**Common Issues:**

```bash
# Permission denied (Unix/macOS/Linux)
chmod +x gradlew
./gradlew build

# Network issues
./gradlew build --offline  # Use cached dependencies

# Clear wrapper cache
rm -rf ~/.gradle/wrapper/
./gradlew build  # Re-download wrapper

# Verify wrapper integrity
./gradlew wrapper --gradle-version 8.4
```

**Wrapper Validation:**

```bash
# Check wrapper version
./gradlew --version

# Validate wrapper files
./gradlew wrapper --validate-wrapper

# Generate wrapper with checksum
./gradlew wrapper --gradle-version 8.4 --gradle-distribution-sha256-sum 3e1af3ae886920c3ac87f7a91f816c0c7c436f276a6eefdb3da152100fef72ae
```

**Custom Wrapper Tasks:**

```gradle
// Custom wrapper configuration
wrapper {
    gradleVersion = '8.4'
    distributionType = Wrapper.DistributionType.ALL
    distributionUrl = "https://services.gradle.org/distributions/gradle-${gradleVersion}-all.zip"
}

// Verify wrapper task
task verifyWrapper(type: Wrapper) {
    gradleVersion = '8.4'
    distributionType = Wrapper.DistributionType.ALL
}
```

#### Advanced Wrapper Usage

**Multiple Gradle Versions:**

```bash
# Different projects can use different Gradle versions
project-a/gradlew build  # Uses Gradle 8.4
project-b/gradlew build  # Uses Gradle 7.6
```

**Wrapper with Custom Properties:**

```bash
# Pass system properties
./gradlew build -Dorg.gradle.daemon=false

# Pass project properties
./gradlew build -PbuildType=release

# Set JVM options
export GRADLE_OPTS="-Xmx2g -XX:MaxMetaspaceSize=512m"
./gradlew build
```

**Gradle Daemon Management:**

```bash
# Start daemon
./gradlew --daemon

# Stop daemon
./gradlew --stop

# No daemon for single build
./gradlew build --no-daemon

# Daemon status
./gradlew --status
```

> **⚠️ Warning:** Always commit wrapper files to version control, but never commit the actual Gradle distribution files (they're downloaded automatically).

The Gradle Wrapper ensures that your project builds consistently across different environments and makes it easy for new team members to get started without manual Gradle installation. It's an essential tool for professional Android development.

---

## 3. Android-Specific Gradle Configuration

Android development with Gradle requires understanding several Android-specific concepts and configurations. The Android Gradle Plugin (AGP) extends Gradle's capabilities to handle Android-specific build requirements like resource processing, manifest merging, and APK generation.

### Android Gradle Plugin

The Android Gradle Plugin is the bridge between Gradle and the Android build system. It provides the tasks, configurations, and conventions needed to build Android applications and libraries.

#### Plugin Types

**Application Plugin (`com.android.application`):**
Used for Android applications that generate APK or AAB files.

```gradle
// Module-level build.gradle (app module)
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'com.example.myapp'
    compileSdk 34

    defaultConfig {
        applicationId "com.example.myapp"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0"
    }
}
```

**Library Plugin (`com.android.library`):**
Used for Android libraries that generate AAR files.

```gradle
// Module-level build.gradle (library module)
plugins {
    id 'com.android.library'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'com.example.mylibrary'
    compileSdk 34

    defaultConfig {
        minSdk 24
        targetSdk 34
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
}
```

**Test Plugin (`com.android.test`):**
Used for standalone test applications.

```gradle
plugins {
    id 'com.android.test'
}

android {
    namespace 'com.example.test'
    compileSdk 34
    
    defaultConfig {
        minSdk 24
        targetSdk 34
    }
    
    targetProjectPath ':app'
}
```

#### Core Android Configuration

**Basic Android Block:**

```gradle
android {
    // Namespace for R class and manifest package
    namespace 'com.example.myapp'
    
    // SDK versions
    compileSdk 34                    // Compile against this API level
    buildToolsVersion '34.0.0'      // Optional: specific build tools version
    
    defaultConfig {
        applicationId "com.example.myapp"    // Unique app identifier
        minSdk 24                           // Minimum supported API level
        targetSdk 34                        // Target API level
        versionCode 1                       // Internal version number
        versionName "1.0"                   // User-visible version
        
        // Test configuration
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        
        // Vector drawable support for older versions
        vectorDrawables.useSupportLibrary = true
        
        // Multi-dex support
        multiDexEnabled true
    }
}
```

**Compilation Options:**

```gradle
android {
    compileOptions {
        // Java version compatibility
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
        
        // Enable incremental annotation processing
        incremental true
    }
    
    kotlinOptions {
        // Kotlin JVM target
        jvmTarget = '1.8'
        
        // Kotlin compiler options
        freeCompilerArgs += [
            '-opt-in=kotlin.RequiresOptIn',
            '-Xjvm-default=all'
        ]
    }
}
```

**Build Features:**

```gradle
android {
    buildFeatures {
        // Enable view binding
        viewBinding true
        
        // Enable data binding
        dataBinding true
        
        // Enable compose
        compose true
        
        // Enable BuildConfig generation
        buildConfig true
        
        // Enable Android Resources (AAPT)
        androidResources true
        
        // Enable ML Model Binding
        mlModelBinding true
    }
    
    // Compose-specific configuration
    composeOptions {
        kotlinCompilerExtensionVersion '1.5.4'
    }
}
```

#### Version Catalogs Integration

Modern Android projects often use version catalogs for dependency management:

```gradle
// gradle/libs.versions.toml
[versions]
agp = "8.1.2"
kotlin = "1.9.10"
core-ktx = "1.12.0"

[libraries]
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "core-ktx" }
androidx-appcompat = { group = "androidx.appcompat", name = "appcompat", version = "1.6.1" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
```

```gradle
// build.gradle (using version catalog)
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

dependencies {
    implementation libs.androidx.core.ktx
    implementation libs.androidx.appcompat
}
```

> **💡 Tip:** Version catalogs provide centralized dependency management and better IDE support. They're recommended for multi-module projects.

### Build Types and Product Flavors

Build types and product flavors are powerful features that allow you to create different versions of your app from the same codebase. Understanding these concepts is crucial for managing different app configurations.

#### Build Types

Build types define how your app is built and packaged. By default, Android projects have `debug` and `release` build types.

**Default Build Types:**

```gradle
android {
    buildTypes {
        debug {
            // Debug-specific configuration
            debuggable true                    // Enable debugging
            minifyEnabled false               // Disable code shrinking
            applicationIdSuffix ".debug"      // Add suffix to app ID
            versionNameSuffix "-DEBUG"        // Add suffix to version name
            
            // Custom build config fields
            buildConfigField "String", "API_URL", '"https://api-dev.example.com"'
            buildConfigField "boolean", "ENABLE_LOGGING", "true"
            
            // Custom resources
            resValue "string", "app_name", "MyApp Debug"
        }
        
        release {
            // Release-specific configuration
            minifyEnabled true                // Enable code shrinking
            shrinkResources true             // Enable resource shrinking
            debuggable false                 // Disable debugging
            
            // ProGuard/R8 configuration
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            
            // Custom build config fields
            buildConfigField "String", "API_URL", '"https://api.example.com"'
            buildConfigField "boolean", "ENABLE_LOGGING", "false"
            
            // Custom resources
            resValue "string", "app_name", "MyApp"
            
            // Signing configuration (if configured)
            signingConfig signingConfigs.release
        }
    }
}
```

**Custom Build Types:**

```gradle
android {
    buildTypes {
        debug { /* ... */ }
        release { /* ... */ }
        
        // Custom build type for staging
        staging {
            initWith debug                    // Inherit from debug
            
            debuggable false
            minifyEnabled true
            applicationIdSuffix ".staging"
            versionNameSuffix "-STAGING"
            
            buildConfigField "String", "API_URL", '"https://api-staging.example.com"'
            
            // Custom ProGuard rules for staging
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules-staging.pro'
        }
        
        // Performance testing build type
        benchmark {
            initWith release
            
            debuggable false
            minifyEnabled true
            applicationIdSuffix ".benchmark"
            
            // Specific optimizations for benchmarking
            buildConfigField "boolean", "BENCHMARK_MODE", "true"
        }
    }
}
```

#### Product Flavors

Product flavors allow you to create different versions of your app with different features, branding, or configurations.

**Basic Product Flavors:**

```gradle
android {
    flavorDimensions "version"
    
    productFlavors {
        free {
            dimension "version"
            applicationIdSuffix ".free"
            versionNameSuffix "-free"
            
            // Free version configuration
            buildConfigField "boolean", "IS_PREMIUM", "false"
            buildConfigField "int", "MAX_DOWNLOADS", "5"
            
            // Custom resources for free version
            resValue "string", "app_name", "MyApp Free"
            resValue "color", "primary_color", "#FF9800"
        }
        
        premium {
            dimension "version"
            applicationIdSuffix ".premium"
            versionNameSuffix "-premium"
            
            // Premium version configuration
            buildConfigField "boolean", "IS_PREMIUM", "true"
            buildConfigField "int", "MAX_DOWNLOADS", "999"
            
            // Custom resources for premium version
            resValue "string", "app_name", "MyApp Premium"
            resValue "color", "primary_color", "#2196F3"
        }
    }
}
```

**Multi-Dimensional Flavors:**

```gradle
android {
    flavorDimensions "version", "environment"
    
    productFlavors {
        // Version dimension
        free {
            dimension "version"
            applicationIdSuffix ".free"
            buildConfigField "boolean", "IS_PREMIUM", "false"
        }
        
        premium {
            dimension "version"
            applicationIdSuffix ".premium"
            buildConfigField "boolean", "IS_PREMIUM", "true"
        }
        
        // Environment dimension
        development {
            dimension "environment"
            buildConfigField "String", "API_URL", '"https://api-dev.example.com"'
            buildConfigField "boolean", "ENABLE_LOGGING", "true"
        }
        
        production {
            dimension "environment"
            buildConfigField "String", "API_URL", '"https://api.example.com"'
            buildConfigField "boolean", "ENABLE_LOGGING", "false"
        }
    }
}
```

This configuration creates the following build variants:
- `freeDevelopmentDebug`, `freeDevelopmentRelease`
- `freeProductionDebug`, `freeProductionRelease`
- `premiumDevelopmentDebug`, `premiumDevelopmentRelease`
- `premiumProductionDebug`, `premiumProductionRelease`

**Flavor-Specific Source Sets:**

```
app/
├── src/
│   ├── main/                    # Common source set
│   ├── debug/                   # Debug build type
│   ├── release/                 # Release build type
│   ├── free/                    # Free flavor
│   │   ├── java/
│   │   ├── res/
│   │   └── AndroidManifest.xml
│   ├── premium/                 # Premium flavor
│   │   ├── java/
│   │   ├── res/
│   │   └── AndroidManifest.xml
│   ├── freeDevelopment/         # Flavor combination
│   └── premiumProduction/       # Flavor combination
```

**Flavor-Specific Dependencies:**

```gradle
dependencies {
    // Common dependencies
    implementation 'androidx.core:core-ktx:1.12.0'
    
    // Flavor-specific dependencies
    freeImplementation 'com.google.android.gms:play-services-ads:22.5.0'
    premiumImplementation 'com.example:premium-features:1.0.0'
    
    // Build type specific dependencies
    debugImplementation 'com.squareup.leakcanary:leakcanary-android:2.12'
    releaseImplementation 'com.example:crash-reporting:1.0.0'
    
    // Variant-specific dependencies
    freeDebugImplementation 'com.example:debug-tools:1.0.0'
}
```

#### Build Variants

Build variants are combinations of build types and product flavors. Each variant can have its own configuration, resources, and source code.

**Working with Build Variants:**

```bash
# List all available variants
./gradlew tasks --group="build"

# Build specific variants
./gradlew assembleFreeDebug
./gradlew assemblePremiumRelease
./gradlew assembleFreeDevelopmentDebug

# Install specific variants
./gradlew installFreeDebug
./gradlew installPremiumRelease
```

**Variant-Specific Configuration:**

```gradle
android {
    applicationVariants.all { variant ->
        // Access variant properties
        def buildType = variant.buildType.name
        def flavor = variant.flavorName
        def versionName = variant.versionName
        
        // Customize output file names
        variant.outputs.all { output ->
            def fileName = "MyApp-${flavor}-${buildType}-${versionName}.apk"
            outputFileName = fileName
        }
        
        // Add custom build config fields based on variant
        if (variant.name.contains("premium")) {
            variant.buildConfigField "String", "PREMIUM_KEY", '"premium-api-key"'
        }
        
        // Variant-specific tasks
        if (variant.buildType.name == "release") {
            // Add custom tasks for release variants
            def copyTask = tasks.create("copy${variant.name.capitalize()}Assets", Copy) {
                from 'src/main/assets-release'
                into variant.mergeAssetsProvider.get().outputDir
            }
            variant.mergeAssetsProvider.get().dependsOn copyTask
        }
    }
}
```

> **⚠️ Warning:** Too many flavor dimensions can lead to an exponential number of build variants. Keep dimensions minimal and focused on actual needs.

### Manifest Merging

Android manifest merging is a crucial process that combines multiple AndroidManifest.xml files from your app, libraries, and build variants into a single manifest file for the final APK.

#### Understanding Manifest Merging

**Manifest Sources (in priority order):**
1. Build variant manifest (highest priority)
2. Build type manifest
3. Product flavor manifest
4. Main source set manifest
5. Library manifests (lowest priority)

**Merge Process:**

```
Main Manifest (src/main/AndroidManifest.xml)
    ↓
+ Flavor Manifest (src/free/AndroidManifest.xml)
    ↓
+ Build Type Manifest (src/debug/AndroidManifest.xml)
    ↓
+ Library Manifests (from dependencies)
    ↓
= Final Merged Manifest
```

#### Basic Manifest Structure

**Main Manifest (src/main/AndroidManifest.xml):**

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:name=".MyApplication"
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/Theme.MyApp"
        tools:targetApi="31">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.MyApp.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>
```

#### Flavor-Specific Manifests

**Free Flavor Manifest (src/free/AndroidManifest.xml):**

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Ad-related permissions for free version -->
    <uses-permission android:name="com.google.android.gms.permission.AD_ID" />

    <application>
        <!-- Ad activity for free version -->
        <activity
            android:name=".ads.AdActivity"
            android:theme="@style/Theme.MyApp.Ads" />

        <!-- Ad provider -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="@string/admob_app_id" />
    </application>

</manifest>
```

**Premium Flavor Manifest (src/premium/AndroidManifest.xml):**

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/tools">

    <application>
        <!-- Premium features activity -->
        <activity
            android:name=".premium.PremiumFeaturesActivity"
            android:theme="@style/Theme.MyApp.Premium" />

        <!-- Remove ads meta-data from free version -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            tools:node="remove" />
    </application>

</manifest>
```

#### Build Type Manifests

**Debug Manifest (src/debug/AndroidManifest.xml):**

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- Debug-only permissions -->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
        tools:ignore="ScopedStorage" />

    <application
        android:name=".debug.DebugApplication"
        android:allowBackup="true"
        tools:replace="android:name">

        <!-- Debug activity -->
        <activity
            android:name=".debug.DebugActivity"
            android:label="Debug Tools" />

        <!-- Network security config for debug -->
        <meta-data
            android:name="android.security.net.config"
            android:resource="@xml/network_security_config_debug" />
    </application>

</manifest>
```

#### Merge Rules and Tools Attributes

**Common Tools Attributes:**

```xml
<!-- Replace attribute completely -->
<application
    android:name=".MyApplication"
    tools:replace="android:name">

<!-- Remove element -->
<uses-permission
    android:name="android.permission.CAMERA"
    tools:node="remove" />

<!-- Merge strategy -->
<uses-permission
    android:name="android.permission.WRITE_EXTERNAL_STORAGE"
    tools:node="merge" />

<!-- Strict merge (fail if conflict) -->
<activity
    android:name=".MainActivity"
    tools:node="strict" />

<!-- Remove all children -->
<application tools:node="removeAll">
    <!-- New children -->
</application>

<!-- Merge all attributes -->
<activity
    android:name=".MainActivity"
    tools:node="mergeOnlyAttributes" />
```

**Placeholder Replacement:**

```gradle
// build.gradle
android {
    defaultConfig {
        manifestPlaceholders = [
            appName: "MyApp",
            hostName: "www.example.com"
        ]
    }
    
    buildTypes {
        debug {
            manifestPlaceholders.hostName = "debug.example.com"
        }
        release {
            manifestPlaceholders.hostName = "www.example.com"
        }
    }
}
```

```xml
<!-- AndroidManifest.xml -->
<application android:label="${appName}">
    <activity android:name=".WebActivity">
        <intent-filter>
            <data android:host="${hostName}" />
        </intent-filter>
    </activity>
</application>
```

#### Debugging Manifest Merging

**View Merged Manifest:**

```bash
# Build the app to generate merged manifest
./gradlew assembleDebug

# Merged manifest location
app/build/intermediates/merged_manifests/debug/AndroidManifest.xml
```

**Manifest Merger Report:**

```bash
# Enable detailed merger reports
android {
    compileSdkVersion 34
    
    defaultConfig {
        // Enable merger reports
        manifestPlaceholders = [:]
    }
}

# Report location after build
app/build/outputs/logs/manifest-merger-debug-report.txt
```

**Common Merge Conflicts and Solutions:**

```xml
<!-- Problem: Conflicting activity declarations -->
<!-- Solution: Use tools:replace -->
<activity
    android:name=".MainActivity"
    android:theme="@style/MyTheme"
    tools:replace="android:theme" />

<!-- Problem: Unwanted permissions from libraries -->
<!-- Solution: Remove them explicitly -->
<uses-permission
    android:name="android.permission.READ_PHONE_STATE"
    tools:node="remove" />

<!-- Problem: Conflicting application names -->
<!-- Solution: Use tools:replace in higher priority manifest -->
<application
    android:name=".MyCustomApplication"
    tools:replace="android:name" />
```

> **💡 Tip:** Use `./gradlew :app:processDebugManifest --info` to see detailed manifest merging logs and identify merge conflicts.

### Resource Processing

Android resource processing is a complex system that handles the compilation, merging, and optimization of resources from multiple sources. Understanding this process is essential for efficient Android development.

#### Resource Types and Processing

**Resource Categories:**
- **Values**: strings, colors, dimensions, styles, themes
- **Drawable**: images, vector drawables, shapes
- **Layout**: XML layout files
- **Menu**: menu definitions
- **Raw**: unprocessed files
- **Assets**: unprocessed files accessible via AssetManager

**Resource Processing Pipeline:**

```
Source Resources → AAPT2 → Compiled Resources → Resource Merging → Final APK
```

#### Resource Merging and Prioritization

**Resource Source Priority (highest to lowest):**
1. Build variant specific (e.g., `src/freeDebug/res/`)
2. Build type specific (e.g., `src/debug/res/`)
3. Product flavor specific (e.g., `src/free/res/`)
4. Main source set (`src/main/res/`)
5. Library resources (dependency order)

**Example Resource Structure:**

```
app/src/
├── main/res/
│   ├── values/
│   │   ├── strings.xml          # Base strings
│   │   ├── colors.xml           # Base colors
│   │   └── styles.xml           # Base styles
│   └── drawable/
│       └── ic_launcher.png      # Base launcher icon
├── free/res/
│   ├── values/
│   │   └── strings.xml          # Free-specific strings
│   └── drawable/
│       └── ic_launcher.png      # Free launcher icon
├── premium/res/
│   ├── values/
│   │   └── strings.xml          # Premium-specific strings
│   └── drawable/
│       └── ic_launcher.png      # Premium launcher icon
└── debug/res/
    └── values/
        └── strings.xml          # Debug-specific strings
```

#### Configuration-Specific Resources

**Density-Specific Resources:**

```
res/
├── drawable-ldpi/          # ~120dpi
├── drawable-mdpi/          # ~160dpi (baseline)
├── drawable-hdpi/          # ~240dpi
├── drawable-xhdpi/         # ~320dpi
├── drawable-xxhdpi/        # ~480dpi
├── drawable-xxxhdpi/       # ~640dpi
└── drawable-nodpi/         # No scaling
```

**Screen Size and Orientation:**

```
res/
├── layout/                 # Default layout
├── layout-land/            # Landscape orientation
├── layout-port/            # Portrait orientation
├── layout-sw600dp/         # Smallest width >= 600dp (tablets)
├── layout-w820dp/          # Available width >= 820dp
└── layout-h720dp/          # Available height >= 720dp
```

**Language and Region:**

```
res/
├── values/                 # Default (English)
├── values-es/              # Spanish
├── values-fr/              # French
├── values-de/              # German
├── values-zh-rCN/          # Chinese (China)
└── values-zh-rTW/          # Chinese (Taiwan)
```

#### Resource Compilation with AAPT2

**AAPT2 Configuration:**

```gradle
android {
    aaptOptions {
        // Disable PNG crunching for faster builds
        cruncherEnabled false
        
        // Additional AAPT parameters
        additionalParameters '--no-version-vectors'
        
        // Ignore assets pattern
        ignoreAssetsPattern '!.svn:!.git:.*:!CVS:!thumbs.db:!picasa.ini:!*.scc:*~'
    }
    
    // Resource shrinking
    buildTypes {
        release {
            shrinkResources true
            minifyEnabled true
        }
    }
}
```

**Vector Drawable Configuration:**

```gradle
android {
    defaultConfig {
        // Enable vector drawable support for API < 21
        vectorDrawables.useSupportLibrary = true
        
        // Generate PNG from vector drawables for older versions
        vectorDrawables.generatedDensities = ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi']
    }
}
```

#### Resource Optimization

**Resource Shrinking:**

```gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true  // Remove unused resources
            
            // Keep specific resources
            resConfigs "en", "es", "fr"  // Keep only these languages
        }
    }
}
```

**Custom Resource Keeping Rules:**

```xml
<!-- res/raw/keep.xml -->
<?xml version="1.0" encoding="utf-8"?>
<resources xmlns:tools="http://schemas.android.com/tools"
    tools:keep="@layout/used_by_reflection,@drawable/used_dynamically" />
```

**Resource Shrinking Configuration:**

```gradle
android {
    buildTypes {
        release {
            shrinkResources true
            
            // Custom shrinking behavior
            resConfigs "en", "xxhdpi"  // Keep only English and xxhdpi resources
        }
    }
}
```

#### Build Configuration Fields and Resources

**BuildConfig Fields:**

```gradle
android {
    buildTypes {
        debug {
            buildConfigField "String", "API_URL", '"https://api-dev.example.com"'
            buildConfigField "boolean", "ENABLE_LOGGING", "true"
            buildConfigField "int", "CACHE_SIZE", "50"
        }
        
        release {
            buildConfigField "String", "API_URL", '"https://api.example.com"'
            buildConfigField "boolean", "ENABLE_LOGGING", "false"
            buildConfigField "int", "CACHE_SIZE", "100"
        }
    }
}
```

Generated BuildConfig.java:
```java
public final class BuildConfig {
    public static final String API_URL = "https://api-dev.example.com";
    public static final boolean ENABLE_LOGGING = true;
    public static final int CACHE_SIZE = 50;
}
```

**Resource Values:**

```gradle
android {
    buildTypes {
        debug {
            resValue "string", "app_name", "MyApp Debug"
            resValue "color", "primary_color", "#FF9800"
            resValue "bool", "enable_analytics", "false"
        }
        
        release {
            resValue "string", "app_name", "MyApp"
            resValue "color", "primary_color", "#2196F3"
            resValue "bool", "enable_analytics", "true"
        }
    }
}
```

#### Advanced Resource Processing

**Custom Resource Processing:**

```gradle
android {
    applicationVariants.all { variant ->
        // Custom resource processing task
        def processResourcesTask = tasks.create("process${variant.name.capitalize()}CustomResources") {
            doLast {
                // Custom resource processing logic
                def resDir = variant.mergeResourcesProvider.get().outputDir
                
                // Process custom resources
                fileTree(resDir).matching {
                    include '**/*.xml'
                }.each { file ->
                    // Custom processing logic
                    println "Processing resource: ${file.name}"
                }
            }
        }
        
        // Make the task run after resource merging
        variant.mergeResourcesProvider.get().finalizedBy processResourcesTask
    }
}
```

**Resource Filtering:**

```gradle
android {
    defaultConfig {
        // Include only specific densities
        resConfigs "mdpi", "hdpi", "xhdpi", "xxhdpi", "xxxhdpi"
        
        // Include only specific languages
        resConfigs "en", "es", "fr"
    }
}
```

> **💡 Tip:** Use resource shrinking in release builds to reduce APK size by removing unused resources automatically.

### ProGuard/R8 Configuration

Code shrinking, obfuscation, and optimization are crucial for release builds. Android uses R8 (which replaced ProGuard) as the default code shrinker and obfuscator.

#### Understanding R8 vs ProGuard

**R8 (Default since AGP 3.4.0):**
- Faster compilation
- Better optimization
- Integrated with Android build system
- Backward compatible with ProGuard rules

**ProGuard (Legacy):**
- Separate tool
- More configuration options
- Slower compilation
- Still supported for compatibility

#### Basic R8/ProGuard Configuration

**Enabling Code Shrinking:**

```gradle
android {
    buildTypes {
        release {
            minifyEnabled true              // Enable code shrinking
            shrinkResources true           // Enable resource shrinking
            
            // ProGuard/R8 configuration files
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
        
        debug {
            minifyEnabled false            // Usually disabled for debug
            debuggable true
        }
    }
}
```

**Default ProGuard Files:**
- `proguard-android.txt`: Basic Android rules
- `proguard-android-optimize.txt`: Android rules with optimizations

#### ProGuard Rules Syntax

**Basic Rule Types:**

```proguard
# Keep classes and members
-keep class com.example.MyClass
-keep class com.example.** { *; }
-keepclassmembers class com.example.MyClass { *; }

# Keep classes with specific annotations
-keep @com.example.KeepThis class *
-keep class * {
    @com.example.KeepThis *;
}

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep enums
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Keep Parcelable implementations
-keepclassmembers class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator CREATOR;
}
```

#### Common ProGuard Rules

**proguard-rules.pro:**

```proguard
# Basic Android rules
-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses
-verbose

# Optimization settings
-optimizations !code/simplification/arithmetic,!code/simplification/cast,!field/*,!class/merging/*
-optimizationpasses 5
-allowaccessmodification

# Keep line numbers for debugging
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# Keep annotations
-keepattributes *Annotation*

# Keep generic signatures
-keepattributes Signature

# Keep inner classes
-keepattributes InnerClasses,EnclosingMethod

# Gson rules (if using Gson)
-keepattributes Signature
-keepattributes *Annotation*
-dontwarn sun.misc.**
-keep class com.google.gson.** { *; }
-keep class * implements com.google.gson.TypeAdapterFactory
-keep class * implements com.google.gson.JsonSerializer
-keep class * implements com.google.gson.JsonDeserializer

# Retrofit rules (if using Retrofit)
-dontwarn retrofit2.**
-keep class retrofit2.** { *; }
-keepattributes Signature
-keepattributes Exceptions
-keepclasseswithmembers class * {
    @retrofit2.http.* <methods>;
}

# OkHttp rules (if using OkHttp)
-dontwarn okhttp3.**
-dontwarn okio.**
-dontwarn javax.annotation.**
-keepnames class okhttp3.internal.publicsuffix.PublicSuffixDatabase

# Keep model classes (adjust package name)
-keep class com.example.model.** { *; }

# Keep custom exceptions
-keep public class * extends java.lang.Exception

# Keep WebView JavaScript interface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
```

#### Library-Specific Rules

**Room Database:**

```proguard
# Room
-keep class * extends androidx.room.RoomDatabase
-keep @androidx.room.Entity class *
-dontwarn androidx.room.paging.**
```

**Dagger/Hilt:**

```proguard
# Dagger
-dontwarn com.google.errorprone.annotations.**

# Hilt
-keep class dagger.hilt.** { *; }
-keep class javax.inject.** { *; }
-keep class * extends dagger.hilt.android.HiltAndroidApp
-keepclasseswithmembers class * {
    @dagger.hilt.android.AndroidEntryPoint <init>(...);
}
```

**Kotlin Coroutines:**

```proguard
# Kotlin Coroutines
-keepnames class kotlinx.coroutines.internal.MainDispatcherFactory {}
-keepnames class kotlinx.coroutines.CoroutineExceptionHandler {}
-keepclassmembernames class kotlinx.** {
    volatile <fields>;
}
```

#### Advanced R8 Configuration

**R8-Specific Rules:**

```proguard
# R8 full mode (more aggressive optimization)
-allowaccessmodification
-repackageclasses ''

# Keep attribute for reflection
-keepattributes RuntimeVisibleAnnotations,RuntimeVisibleParameterAnnotations,RuntimeVisibleTypeAnnotations

# Assume no side effects for logging
-assumenosideeffects class android.util.Log {
    public static boolean isLoggable(java.lang.String, int);
    public static int v(...);
    public static int i(...);
    public static int w(...);
    public static int d(...);
    public static int e(...);
}
```

**Conditional Rules:**

```proguard
# Keep debug classes only in debug builds
-if class com.example.BuildConfig
-keep class com.example.debug.** { *; }

# Keep classes based on usage
-if class androidx.lifecycle.LiveData
-keep class androidx.lifecycle.** { *; }
```

#### Debugging ProGuard/R8 Issues

**Mapping File:**
The mapping file shows how classes and methods were renamed:

```
# Location: app/build/outputs/mapping/release/mapping.txt
com.example.MyClass -> a.b.c:
    void myMethod() -> a
    java.lang.String myField -> b
```

**Usage File:**
Shows what code was kept or removed:

```
# Location: app/build/outputs/mapping/release/usage.txt
com.example.MyClass
    void myMethod()
    java.lang.String myField
```

**Configuration Dump:**
Shows the final ProGuard configuration:

```
# Location: app/build/outputs/mapping/release/configuration.txt
```

**Debugging Commands:**

```bash
# Retrace stack traces using mapping file
$ANDROID_HOME/tools/proguard/bin/retrace.sh mapping.txt stacktrace.txt

# Analyze APK to see what's included
./gradlew assembleRelease
# Use Android Studio APK Analyzer or:
aapt dump badging app-release.apk
```

**Common Issues and Solutions:**

```proguard
# Issue: Reflection-based libraries not working
# Solution: Keep classes used via reflection
-keep class com.example.ReflectionUsedClass { *; }

# Issue: Serialization libraries failing
# Solution: Keep serializable classes
-keep class * implements java.io.Serializable { *; }

# Issue: Annotation processing not working
# Solution: Keep annotation classes
-keep class * extends java.lang.annotation.Annotation { *; }

# Issue: Native methods not found
# Solution: Keep native method declarations
-keepclasseswithmembernames class * {
    native <methods>;
}
```

**Testing ProGuard Rules:**

```gradle
android {
    buildTypes {
        debug {
            minifyEnabled true  // Enable for testing
            useProguard false   // Use R8 instead of ProGuard
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

> **⚠️ Warning:** Always test your app thoroughly after enabling code shrinking. Some functionality might break due to aggressive optimization or incorrect ProGuard rules.

> **💡 Tip:** Use `@Keep` annotation from AndroidX to keep specific classes or methods without writing ProGuard rules:

```kotlin
import androidx.annotation.Keep

@Keep
class ImportantClass {
    @Keep
    fun importantMethod() { }
}
```

This completes the comprehensive Android-Specific Configuration section, covering all the essential aspects of Android Gradle Plugin configuration, build types, product flavors, manifest merging, resource processing, and ProGuard/R8 configuration with practical examples and best practices.

---

## 4. Intermediate Topics

### Multi-Module Projects

Multi-module projects are essential for organizing large Android applications. They improve build performance, enable code reuse, and enforce architectural boundaries.

#### Why Use Multi-Module Architecture?

**Benefits:**
- **Faster Build Times**: Only modified modules are rebuilt
- **Better Code Organization**: Clear separation of concerns
- **Reusability**: Modules can be shared across projects
- **Team Collaboration**: Different teams can work on different modules
- **Dependency Management**: Enforced architectural boundaries

**Common Module Types:**
- **App Module**: Main application module
- **Feature Modules**: Specific app features (login, profile, etc.)
- **Core/Common Modules**: Shared utilities and base classes
- **Data Modules**: Data layer (repositories, network, database)
- **Domain Modules**: Business logic and use cases

#### Setting Up Multi-Module Projects

**Project Structure:**
```
MyApp/
├── settings.gradle
├── build.gradle                 (root project)
├── app/                        (application module)
│   ├── build.gradle
│   └── src/
├── core/                       (core utilities)
│   ├── build.gradle
│   └── src/
├── data/                       (data layer)
│   ├── build.gradle
│   └── src/
├── domain/                     (business logic)
│   ├── build.gradle
│   └── src/
├── feature-login/              (login feature)
│   ├── build.gradle
│   └── src/
└── feature-profile/            (profile feature)
    ├── build.gradle
    └── src/
```

**Root settings.gradle:**
```gradle
rootProject.name = 'MyAndroidApp'

include ':app'
include ':core'
include ':data'
include ':domain'
include ':feature-login'
include ':feature-profile'

// Optional: Custom project directories
project(':core').projectDir = new File('libraries/core')
```

**Root build.gradle:**
```gradle
buildscript {
    ext {
        kotlin_version = '1.9.10'
        gradle_version = '8.1.2'
        compile_sdk = 34
        min_sdk = 24
        target_sdk = 34
    }
    
    dependencies {
        classpath "com.android.tools.build:gradle:$gradle_version"
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        classpath 'com.google.dagger:hilt-android-gradle-plugin:2.48'
    }
}

plugins {
    id 'com.android.application' version '8.1.2' apply false
    id 'com.android.library' version '8.1.2' apply false
    id 'org.jetbrains.kotlin.android' version '1.9.10' apply false
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

// Common configuration for all modules
subprojects {
    apply plugin: 'kotlin-android'
    
    android {
        compileSdk rootProject.ext.compile_sdk
        
        defaultConfig {
            minSdk rootProject.ext.min_sdk
            targetSdk rootProject.ext.target_sdk
            
            testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        }
        
        compileOptions {
            sourceCompatibility JavaVersion.VERSION_1_8
            targetCompatibility JavaVersion.VERSION_1_8
        }
        
        kotlinOptions {
            jvmTarget = '1.8'
        }
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

#### Module Configuration Examples

**App Module (app/build.gradle):**
```gradle
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
    id 'kotlin-kapt'
    id 'dagger.hilt.android.plugin'
}

android {
    namespace 'com.example.myapp'
    
    defaultConfig {
        applicationId "com.example.myapp"
        versionCode 1
        versionName "1.0"
    }
    
    buildTypes {
        debug {
            debuggable true
            applicationIdSuffix ".debug"
        }
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    
    buildFeatures {
        viewBinding true
        dataBinding true
    }
}

dependencies {
    // Internal modules
    implementation project(':core')
    implementation project(':data')
    implementation project(':domain')
    implementation project(':feature-login')
    implementation project(':feature-profile')
    
    // External dependencies
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'androidx.activity:activity-ktx:1.8.0'
    implementation 'androidx.fragment:fragment-ktx:1.6.2'
    
    // Dependency Injection
    implementation 'com.google.dagger:hilt-android:2.48'
    kapt 'com.google.dagger:hilt-compiler:2.48'
    
    // Navigation
    implementation 'androidx.navigation:navigation-fragment-ktx:2.7.4'
    implementation 'androidx.navigation:navigation-ui-ktx:2.7.4'
}
```

**Core Module (core/build.gradle):**
```gradle
plugins {
    id 'com.android.library'
    id 'org.jetbrains.kotlin.android'
    id 'kotlin-kapt'
}

android {
    namespace 'com.example.core'
    
    buildFeatures {
        viewBinding true
    }
}

dependencies {
    // Common utilities that other modules can use
    api 'androidx.core:core-ktx:1.12.0'
    api 'androidx.appcompat:appcompat:1.6.1'
    api 'com.google.android.material:material:1.10.0'
    
    // Networking
    api 'com.squareup.retrofit2:retrofit:2.9.0'
    api 'com.squareup.retrofit2:converter-gson:2.9.0'
    api 'com.squareup.okhttp3:logging-interceptor:4.12.0'
    
    // Image loading
    api 'com.github.bumptech.glide:glide:4.16.0'
    
    // Coroutines
    api 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3'
    
    // Testing
    testImplementation 'junit:junit:4.13.2'
    testImplementation 'org.mockito:mockito-core:5.6.0'
    testImplementation 'org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3'
}
```

**Feature Module (feature-login/build.gradle):**
```gradle
plugins {
    id 'com.android.library'
    id 'org.jetbrains.kotlin.android'
    id 'kotlin-kapt'
    id 'dagger.hilt.android.plugin'
}

android {
    namespace 'com.example.feature.login'
    
    buildFeatures {
        viewBinding true
    }
}

dependencies {
    // Internal dependencies
    implementation project(':core')
    implementation project(':domain')
    
    // Feature-specific dependencies
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-livedata-ktx:2.7.0'
    
    // Dependency Injection
    implementation 'com.google.dagger:hilt-android:2.48'
    kapt 'com.google.dagger:hilt-compiler:2.48'
    
    // Testing
    testImplementation 'junit:junit:4.13.2'
    testImplementation 'androidx.arch.core:core-testing:2.2.0'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
}
```

#### Module Dependencies Best Practices

**Dependency Types:**
```gradle
dependencies {
    // implementation: Available to this module only
    implementation project(':core')
    
    // api: Exposed to modules that depend on this module
    api project(':domain')
    
    // compileOnly: Available only at compile time
    compileOnly 'javax.annotation:javax.annotation-api:1.3.2'
    
    // runtimeOnly: Available only at runtime
    runtimeOnly 'com.h2database:h2:2.2.224'
}
```

**Avoiding Circular Dependencies:**
```gradle
// ❌ Bad: Circular dependency
// Module A depends on Module B
// Module B depends on Module A

// ✅ Good: Use abstraction layer
// Module A depends on Domain
// Module B depends on Domain
// Domain contains shared interfaces
```

**Module Dependency Graph Example:**
```
app
├── feature-login
│   ├── domain
│   └── core
├── feature-profile  
│   ├── domain
│   ├── data
│   └── core
├── data
│   ├── domain
│   └── core
├── domain
│   └── core
└── core
```

#### Advanced Multi-Module Techniques

**Composite Builds:**
```gradle
// settings.gradle
includeBuild '../shared-library'

// Use in dependencies
dependencies {
    implementation 'com.example:shared-library'
}
```

**Feature Modules with Dynamic Delivery:**
```gradle
// feature-module/build.gradle
plugins {
    id 'com.android.dynamic-feature'
}

android {
    namespace 'com.example.feature.premium'
}

dependencies {
    implementation project(':app')
}
```

**Version Catalogs for Dependency Management:**
```gradle
// gradle/libs.versions.toml
[versions]
kotlin = "1.9.10"
retrofit = "2.9.0"

[libraries]
kotlin-stdlib = { module = "org.jetbrains.kotlin:kotlin-stdlib", version.ref = "kotlin" }
retrofit = { module = "com.squareup.retrofit2:retrofit", version.ref = "retrofit" }

[bundles]
networking = ["retrofit", "okhttp", "gson"]

// In module build.gradle
dependencies {
    implementation libs.kotlin.stdlib
    implementation libs.bundles.networking
}
```

### Custom Tasks and Plugins

Custom tasks and plugins extend Gradle's functionality to automate project-specific build processes. They're essential for complex Android projects with unique requirements.

#### Understanding Gradle Tasks

**Task Lifecycle:**
1. **Configuration Phase**: Task is configured but not executed
2. **Execution Phase**: Task's actions are executed

**Task Types:**
- **Ad-hoc Tasks**: Simple tasks defined inline
- **Enhanced Tasks**: Tasks with custom logic and properties
- **Task Classes**: Reusable task implementations

#### Creating Custom Tasks

**Simple Ad-hoc Task:**
```gradle
task hello {
    doLast {
        println 'Hello from custom task!'
    }
}

task printBuildInfo {
    doLast {
        println "Project: ${project.name}"
        println "Version: ${android.defaultConfig.versionName}"
        println "Build time: ${new Date()}"
    }
}
```

**Task with Configuration:**
```gradle
task generateVersionFile {
    def outputDir = file("$buildDir/generated/version")
    def versionFile = file("$outputDir/Version.kt")
    
    // Declare inputs and outputs for up-to-date checking
    inputs.property("versionName", android.defaultConfig.versionName)
    inputs.property("versionCode", android.defaultConfig.versionCode)
    outputs.file(versionFile)
    
    doLast {
        outputDir.mkdirs()
        versionFile.text = """
package com.example.generated

object Version {
    const val NAME = "${android.defaultConfig.versionName}"
    const val CODE = ${android.defaultConfig.versionCode}
    const val BUILD_TIME = "${new Date().format('yyyy-MM-dd HH:mm:ss')}"
}
"""
    }
}

// Hook into Android build process
android.applicationVariants.all { variant ->
    variant.registerJavaGeneratingTask(generateVersionFile, generateVersionFile.outputs.files)
}
```

**Enhanced Task with Properties:**
```gradle
class GenerateConfigTask extends DefaultTask {
    @Input
    String configName
    
    @Input
    Map<String, String> properties
    
    @OutputFile
    File outputFile
    
    @TaskAction
    void generateConfig() {
        outputFile.parentFile.mkdirs()
        
        def content = """
package com.example.config

object ${configName}Config {
${properties.collect { key, value -> "    const val ${key.toUpperCase()} = \"$value\"" }.join('\n')}
}
"""
        outputFile.text = content
    }
}

task generateDebugConfig(type: GenerateConfigTask) {
    configName = 'Debug'
    properties = [
        'api_url': 'https://api-dev.example.com',
        'log_level': 'DEBUG',
        'enable_crash_reporting': 'false'
    ]
    outputFile = file("$buildDir/generated/config/DebugConfig.kt")
}

task generateReleaseConfig(type: GenerateConfigTask) {
    configName = 'Release'
    properties = [
        'api_url': 'https://api.example.com',
        'log_level': 'ERROR',
        'enable_crash_reporting': 'true'
    ]
    outputFile = file("$buildDir/generated/config/ReleaseConfig.kt")
}
```

#### Working with Android Build Variants

**Variant-Specific Tasks:**
```gradle
android.applicationVariants.all { variant ->
    def variantName = variant.name.capitalize()
    
    // Create variant-specific task
    task "generate${variantName}BuildInfo" {
        def outputDir = file("$buildDir/generated/${variant.name}/buildinfo")
        def buildInfoFile = file("$outputDir/BuildInfo.kt")
        
        inputs.property("buildType", variant.buildType.name)
        inputs.property("flavor", variant.flavorName ?: "default")
        outputs.file(buildInfoFile)
        
        doLast {
            outputDir.mkdirs()
            buildInfoFile.text = """
package com.example.buildinfo

object BuildInfo {
    const val BUILD_TYPE = "${variant.buildType.name}"
    const val FLAVOR = "${variant.flavorName ?: 'default'}"
    const val VERSION_NAME = "${variant.versionName}"
    const val VERSION_CODE = ${variant.versionCode}
    const val APPLICATION_ID = "${variant.applicationId}"
    const val BUILD_TIME = "${new Date()}"
    const val DEBUG = ${variant.buildType.debuggable}
}
"""
        }
    }
    
    // Hook into compilation
    variant.registerJavaGeneratingTask(tasks["generate${variantName}BuildInfo"], 
                                     file("$buildDir/generated/${variant.name}/buildinfo"))
}
```

**Resource Generation Tasks:**
```gradle
task generateStringResources {
    def outputDir = file("src/main/res/values")
    def stringsFile = file("$outputDir/generated_strings.xml")
    
    inputs.property("buildTime", new Date().time)
    outputs.file(stringsFile)
    
    doLast {
        outputDir.mkdirs()
        stringsFile.text = """<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="build_time">${new Date().format('yyyy-MM-dd HH:mm:ss')}</string>
    <string name="version_info">Version ${android.defaultConfig.versionName} (${android.defaultConfig.versionCode})</string>
</resources>
"""
    }
}

// Run before resource processing
tasks.whenTaskAdded { task ->
    if (task.name.startsWith('process') && task.name.endsWith('Resources')) {
        task.dependsOn generateStringResources
    }
}
```

#### Custom Plugins

**Simple Plugin (build.gradle):**
```gradle
class AndroidUtilsPlugin implements Plugin<Project> {
    void apply(Project project) {
        // Add extension for configuration
        project.extensions.create('androidUtils', AndroidUtilsExtension)
        
        // Add custom tasks
        project.task('printAppInfo') {
            doLast {
                def android = project.android
                def utils = project.androidUtils
                
                println "=== App Information ==="
                println "Package: ${android.defaultConfig.applicationId}"
                println "Version: ${android.defaultConfig.versionName} (${android.defaultConfig.versionCode})"
                println "Min SDK: ${android.defaultConfig.minSdk}"
                println "Target SDK: ${android.defaultConfig.targetSdk}"
                println "Compile SDK: ${android.compileSdkVersion}"
                
                if (utils.showBuildTypes) {
                    println "\n=== Build Types ==="
                    android.buildTypes.each { buildType ->
                        println "- ${buildType.name}: debuggable=${buildType.debuggable}, minifyEnabled=${buildType.minifyEnabled}"
                    }
                }
            }
        }
        
        // Add tasks for each build variant
        project.afterEvaluate {
            project.android.applicationVariants.all { variant ->
                project.task("install${variant.name.capitalize()}AndLaunch") {
                    dependsOn "install${variant.name.capitalize()}"
                    doLast {
                        def adb = project.android.adbExecutable
                        def packageName = variant.applicationId
                        
                        project.exec {
                            commandLine adb, 'shell', 'am', 'start', '-n', 
                                       "${packageName}/.MainActivity"
                        }
                    }
                }
            }
        }
    }
}

class AndroidUtilsExtension {
    boolean showBuildTypes = true
    boolean autoLaunch = false
}

// Apply the plugin
apply plugin: AndroidUtilsPlugin

// Configure the plugin
androidUtils {
    showBuildTypes = true
    autoLaunch = false
}
```

**External Plugin (buildSrc):**

Create `buildSrc/src/main/groovy/AndroidUtilsPlugin.groovy`:
```groovy
import org.gradle.api.Plugin
import org.gradle.api.Project

class AndroidUtilsPlugin implements Plugin<Project> {
    void apply(Project project) {
        project.extensions.create('androidUtils', AndroidUtilsExtension)
        
        project.task('generateAppConstants') {
            def outputDir = project.file("${project.buildDir}/generated/constants")
            def constantsFile = project.file("$outputDir/AppConstants.kt")
            
            inputs.property("versionName", project.android.defaultConfig.versionName)
            inputs.property("versionCode", project.android.defaultConfig.versionCode)
            outputs.file(constantsFile)
            
            doLast {
                outputDir.mkdirs()
                constantsFile.text = """
package com.example.constants

object AppConstants {
    const val VERSION_NAME = "${project.android.defaultConfig.versionName}"
    const val VERSION_CODE = ${project.android.defaultConfig.versionCode}
    const val PACKAGE_NAME = "${project.android.defaultConfig.applicationId}"
    const val BUILD_TIME = "${new Date()}"
}
"""
            }
        }
        
        // Hook into Android build
        project.afterEvaluate {
            project.android.applicationVariants.all { variant ->
                variant.registerJavaGeneratingTask(
                    project.tasks.generateAppConstants,
                    project.file("${project.buildDir}/generated/constants")
                )
            }
        }
    }
}

class AndroidUtilsExtension {
    String constantsPackage = 'com.example.constants'
    boolean generateBuildInfo = true
}
```

Apply in `build.gradle`:
```gradle
plugins {
    id 'AndroidUtilsPlugin'
}

androidUtils {
    constantsPackage = 'com.myapp.constants'
    generateBuildInfo = true
}
```

#### Advanced Task Techniques

**Incremental Tasks:**
```gradle
@CacheableTask
class ProcessFilesTask extends DefaultTask {
    @InputFiles
    @PathSensitive(PathSensitivity.RELATIVE)
    FileCollection inputFiles
    
    @OutputDirectory
    File outputDir
    
    @TaskAction
    void processFiles(IncrementalTaskInputs inputs) {
        if (!inputs.incremental) {
            // Full rebuild
            project.delete(outputDir)
            outputDir.mkdirs()
        }
        
        inputs.outOfDate { change ->
            processFile(change.file)
        }
        
        inputs.removed { change ->
            def outputFile = new File(outputDir, change.file.name)
            outputFile.delete()
        }
    }
    
    void processFile(File inputFile) {
        def outputFile = new File(outputDir, inputFile.name)
        // Process file...
        outputFile.text = inputFile.text.toUpperCase()
    }
}
```

**Task Rules:**
```gradle
tasks.addRule("Pattern: build<Flavor>Apk") { String taskName ->
    if (taskName.startsWith("build") && taskName.endsWith("Apk")) {
        def flavor = taskName.substring(5, taskName.length() - 3).toLowerCase()
        
        task(taskName) {
            doLast {
                println "Building APK for flavor: $flavor"
                // Custom build logic for specific flavor
            }
        }
    }
}

// Now you can run: ./gradlew buildPremiumApk, buildFreeApk, etc.
```

### Testing Configuration

Comprehensive testing configuration is crucial for maintaining code quality in Android projects. Gradle provides extensive support for different types of testing.

#### Types of Testing in Android

**Test Categories:**
1. **Unit Tests**: Test individual components in isolation
2. **Integration Tests**: Test component interactions
3. **Instrumented Tests**: Test on Android devices/emulators
4. **UI Tests**: Test user interface interactions

**Test Source Sets:**
```
app/src/
├── main/                    # Main source code
├── test/                    # Unit tests (JVM)
├── androidTest/             # Instrumented tests (Android)
├── testDebug/              # Debug-specific unit tests
├── testRelease/            # Release-specific unit tests
├── androidTestDebug/       # Debug-specific instrumented tests
└── sharedTest/             # Shared test utilities
```

#### Unit Testing Configuration

**Basic Unit Test Setup:**
```gradle
android {
    testOptions {
        unitTests {
            includeAndroidResources = true
            returnDefaultValues = true
        }
    }
}

dependencies {
    // Unit testing framework
    testImplementation 'junit:junit:4.13.2'
    
    // Mockito for mocking
    testImplementation 'org.mockito:mockito-core:5.6.0'
    testImplementation 'org.mockito:mockito-inline:5.6.0'
    
    // Kotlin testing
    testImplementation 'org.jetbrains.kotlin:kotlin-test:1.9.10'
    testImplementation 'org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3'
    
    // Android testing utilities
    testImplementation 'androidx.test:core:1.5.0'
    testImplementation 'androidx.test.ext:junit:1.1.5'
    testImplementation 'androidx.arch.core:core-testing:2.2.0'
    
    // Robolectric for Android unit tests
    testImplementation 'org.robolectric:robolectric:4.11.1'
}
```

**Advanced Unit Testing Configuration:**
```gradle
android {
    testOptions {
        unitTests {
            includeAndroidResources = true
            returnDefaultValues = true
            
            all {
                // JVM arguments for tests
                jvmArgs '-noverify'
                
                // System properties
                systemProperty 'robolectric.enabledSdks', '28,29,30,31,32,33,34'
                
                // Test logging
                testLogging {
                    events "passed", "skipped", "failed"
                    exceptionFormat "full"
                    showStandardStreams = false
                }
                
                // Parallel execution
                maxParallelForks = Runtime.runtime.availableProcessors().intdiv(2) ?: 1
                
                // Memory settings
                minHeapSize = "128m"
                maxHeapSize = "2g"
            }
        }
    }
}
```

**Custom Test Tasks:**
```gradle
task unitTestsWithCoverage(type: Test) {
    group = 'verification'
    description = 'Run unit tests with coverage'
    
    useJUnitPlatform()
    
    testClassesDirs = sourceSets.test.output.classesDirs
    classpath = sourceSets.test.runtimeClasspath
    
    finalizedBy jacocoTestReport
}

task quickUnitTests(type: Test) {
    group = 'verification'
    description = 'Run fast unit tests only'
    
    useJUnitPlatform {
        excludeTags 'slow', 'integration'
    }
    
    testLogging {
        events "failed"
        exceptionFormat "short"
    }
}
```

#### Instrumented Testing Configuration

**Basic Instrumented Test Setup:**
```gradle
android {
    defaultConfig {
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        testInstrumentationRunnerArguments clearPackageData: 'true'
    }
    
    testOptions {
        execution 'ANDROIDX_TEST_ORCHESTRATOR'
        
        animationsDisabled = true
        
        managedDevices {
            devices {
                pixel2api30(com.android.build.api.dsl.ManagedVirtualDevice) {
                    device = "Pixel 2"
                    apiLevel = 30
                    systemImageSource = "aosp"
                }
            }
        }
    }
}

dependencies {
    // Instrumented testing
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test:runner:1.5.2'
    androidTestImplementation 'androidx.test:rules:1.5.0'
    androidTestImplementation 'androidx.test:core:1.5.0'
    
    // Espresso for UI testing
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation 'androidx.test.espresso:espresso-contrib:3.5.1'
    androidTestImplementation 'androidx.test.espresso:espresso-intents:3.5.1'
    
    // Test orchestrator
    androidTestUtil 'androidx.test:orchestrator:1.4.2'
    
    // UI Automator for cross-app testing
    androidTestImplementation 'androidx.test.uiautomator:uiautomator:2.2.0'
}
```

**Custom Instrumented Test Tasks:**
```gradle
android.testVariants.all { variant ->
    def variantName = variant.name.capitalize()
    
    task "connected${variantName}TestWithRetry"(type: Exec) {
        group = 'verification'
        description = "Run ${variant.name} instrumented tests with retry"
        
        def maxRetries = 3
        def currentRetry = 0
        
        doFirst {
            while (currentRetry < maxRetries) {
                try {
                    project.exec {
                        commandLine './gradlew', "connected${variantName}AndroidTest"
                    }
                    break
                } catch (Exception e) {
                    currentRetry++
                    if (currentRetry >= maxRetries) {
                        throw e
                    }
                    println "Test failed, retrying... (${currentRetry}/${maxRetries})"
                    Thread.sleep(5000)
                }
            }
        }
    }
}
```

#### Test Coverage Configuration

**JaCoCo Coverage:**
```gradle
apply plugin: 'jacoco'

jacoco {
    toolVersion = '0.8.10'
}

android {
    buildTypes {
        debug {
            testCoverageEnabled = true
        }
    }
}

task jacocoTestReport(type: JacocoReport, dependsOn: ['testDebugUnitTest', 'createDebugCoverageReport']) {
    group = 'Reporting'
    description = 'Generate Jacoco coverage reports'
    
    reports {
        xml.required = true
        html.required = true
        csv.required = false
    }
    
    def fileFilter = [
        '**/R.class',
        '**/R$*.class',
        '**/BuildConfig.*',
        '**/Manifest*.*',
        '**/*Test*.*',
        'android/**/*.*',
        '**/*$ViewInjector*.*',
        '**/*$ViewBinder*.*',
        '**/Lambda$*.class',
        '**/Lambda.class',
        '**/*Lambda.class',
        '**/*Lambda*.class',
        '**/*_MembersInjector.class',
        '**/Dagger*Component*.class',
        '**/*Module_*Factory.class',
        '**/di/module/*',
        '**/*_Factory*.*',
        '**/*Module*.*',
        '**/*Dagger*.*',
        '**/*Hilt*.*'
    ]
    
    def debugTree = fileTree(dir: "${buildDir}/intermediates/javac/debug/classes", excludes: fileFilter)
    def kotlinDebugTree = fileTree(dir: "${buildDir}/tmp/kotlin-classes/debug", excludes: fileFilter)
    
    classDirectories.setFrom(files([debugTree, kotlinDebugTree]))
    
    sourceDirectories.setFrom(files([
        'src/main/java',
        'src/main/kotlin',
        'src/debug/java',
        'src/debug/kotlin'
    ]))
    
    executionData.setFrom(fileTree(dir: buildDir, includes: [
        'jacoco/testDebugUnitTest.exec',
        'outputs/code_coverage/debugAndroidTest/connected/**/*.ec'
    ]))
}

task coverageReport {
    group = 'Reporting'
    description = 'Generate coverage report for all test types'
    dependsOn = ['jacocoTestReport']
    
    doLast {
        println "Coverage report generated at: file://${buildDir}/reports/jacoco/jacocoTestReport/html/index.html"
    }
}
```

#### Test Data and Fixtures

**Test Data Management:**
```gradle
android {
    sourceSets {
        test {
            assets.srcDirs += 'src/test/assets'
            resources.srcDirs += 'src/test/resources'
        }
        
        androidTest {
            assets.srcDirs += 'src/androidTest/assets'
        }
        
        // Shared test utilities
        sharedTest {
            java.srcDir 'src/sharedTest/java'
            kotlin.srcDir 'src/sharedTest/kotlin'
        }
        
        test {
            java.srcDirs += sourceSets.sharedTest.java.srcDirs
            kotlin.srcDirs += sourceSets.sharedTest.kotlin.srcDirs
        }
        
        androidTest {
            java.srcDirs += sourceSets.sharedTest.java.srcDirs
            kotlin.srcDirs += sourceSets.sharedTest.kotlin.srcDirs
        }
    }
}

task copyTestData(type: Copy) {
    from 'test-data'
    into 'src/test/assets/test-data'
    include '**/*.json'
    include '**/*.xml'
}

tasks.whenTaskAdded { task ->
    if (task.name == 'processDebugUnitTestJavaRes') {
        task.dependsOn copyTestData
    }
}
```

**Database Testing Configuration:**
```gradle
dependencies {
    // Room testing
    testImplementation 'androidx.room:room-testing:2.6.0'
    
    // In-memory database for testing
    testImplementation 'androidx.sqlite:sqlite-framework:2.4.0'
    androidTestImplementation 'androidx.sqlite:sqlite-framework:2.4.0'
}

android {
    testOptions {
        unitTests {
            includeAndroidResources = true
        }
    }
}
```

#### Continuous Integration Testing

**CI-Specific Test Configuration:**
```gradle
task ciUnitTests(type: Test) {
    group = 'ci'
    description = 'Run unit tests for CI'
    
    useJUnitPlatform()
    
    testLogging {
        events "passed", "skipped", "failed"
        exceptionFormat "full"
        showStandardStreams = true
    }
    
    reports {
        junitXml.required = true
        html.required = false
    }
    
    // Fail fast for CI
    failFast = true
    
    // Parallel execution for faster CI builds
    maxParallelForks = Runtime.runtime.availableProcessors()
}

task ciInstrumentedTests {
    group = 'ci'
    description = 'Run instrumented tests for CI'
    
    doLast {
        exec {
            commandLine './gradlew', 'connectedDebugAndroidTest',
                       '--continue',
                       '--stacktrace'
        }
    }
}

task ciAllTests {
    group = 'ci'
    description = 'Run all tests for CI'
    dependsOn = ['ciUnitTests', 'ciInstrumentedTests', 'lint']
}
```

### Signing and Publishing

App signing and publishing are critical aspects of Android development. Gradle provides comprehensive support for managing signing configurations and automating the publishing process.

#### Understanding Android App Signing

**Signing Concepts:**
- **Debug Signing**: Automatic signing for development builds
- **Release Signing**: Manual signing for production releases
- **Key Store**: File containing private keys for signing
- **Key Alias**: Identifier for a specific key within a keystore
- **APK Signing Scheme**: v1 (JAR signing) and v2+ (APK Signature Scheme)

#### Debug Signing Configuration

Debug signing is handled automatically by Android Gradle Plugin:

```gradle
android {
    signingConfigs {
        debug {
            // Debug keystore is automatically generated
            // Located at: ~/.android/debug.keystore
            storeFile file(System.getProperty("user.home") + "/.android/debug.keystore")
            storePassword "android"
            keyAlias "androiddebugkey"
            keyPassword "android"
        }
    }
    
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
            debuggable true
            applicationIdSuffix ".debug"
        }
    }
}
```

#### Release Signing Configuration

**Method 1: Direct Configuration (Not Recommended for Production)**
```gradle
android {
    signingConfigs {
        release {
            storeFile file("path/to/release.keystore")
            storePassword "your_store_password"
            keyAlias "your_key_alias"
            keyPassword "your_key_password"
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

**Method 2: Using Properties File (Recommended)**

Create `keystore.properties` (add to .gitignore):
```properties
storeFile=path/to/release.keystore
storePassword=your_store_password
keyAlias=your_key_alias
keyPassword=your_key_password
```

Configure in `build.gradle`:
```gradle
// Load keystore properties
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    signingConfigs {
        release {
            if (keystorePropertiesFile.exists()) {
                storeFile file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
            }
        }
    }
    
    buildTypes {
        release {
            if (keystorePropertiesFile.exists()) {
                signingConfig signingConfigs.release
            }
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

**Method 3: Using Environment Variables (CI/CD)**
```gradle
android {
    signingConfigs {
        release {
            storeFile file(System.getenv("KEYSTORE_FILE") ?: "release.keystore")
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias System.getenv("KEY_ALIAS")
            keyPassword System.getenv("KEY_PASSWORD")
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

#### Advanced Signing Configurations

**Multiple Signing Configurations:**
```gradle
android {
    signingConfigs {
        debug {
            // Debug configuration
        }
        
        staging {
            storeFile file("staging.keystore")
            storePassword "staging_password"
            keyAlias "staging_key"
            keyPassword "staging_key_password"
        }
        
        release {
            // Production configuration
        }
    }
    
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        
        staging {
            signingConfig signingConfigs.staging
            debuggable true
            applicationIdSuffix ".staging"
        }
        
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

**Flavor-Specific Signing:**
```gradle
android {
    productFlavors {
        free {
            signingConfig signingConfigs.release
        }
        
        premium {
            signingConfig signingConfigs.release
            // Could use different signing config if needed
        }
    }
}
```

#### Publishing to Google Play

**Google Play Publishing Plugin:**
```gradle
plugins {
    id 'com.github.triplet.play' version '3.8.4'
}

play {
    serviceAccountCredentials = file("service-account.json")
    track = 'internal' // internal, alpha, beta, production
    
    // Release configuration
    releaseStatus = 'draft' // draft, inProgress, halted, completed
    userFraction = 0.1 // For staged rollouts
    
    // Artifact configuration
    artifactDir = file("build/outputs/apk/release")
    
    // Metadata
    defaultToAppBundles = true
}

task publishToPlayStore {
    group = 'publishing'
    description = 'Publish app to Google Play Store'
    dependsOn = ['bundleRelease', 'publishBundle']
}
```

**Publishing Configuration:**
```gradle
android {
    bundle {
        language {
            enableSplit = true
        }
        density {
            enableSplit = true
        }
        abi {
            enableSplit = true
        }
    }
}

play {
    // Upload mapping files for crash reporting
    uploadCrashlyticsMappingFile = true
    
    // Release notes
    releaseNotes = [
        'en-US': file('release-notes/en-US.txt'),
        'es-ES': file('release-notes/es-ES.txt')
    ]
    
    // Screenshots and metadata
    uploadImages = true
    uploadMetadata = true
}
```

#### Custom Publishing Tasks

**Build and Sign Task:**
```gradle
task buildAndSignRelease {
    group = 'publishing'
    description = 'Build and sign release APK'
    
    dependsOn 'assembleRelease'
    
    doLast {
        def apkFile = file("build/outputs/apk/release/app-release.apk")
        if (apkFile.exists()) {
            println "✅ Release APK built and signed successfully!"
            println "📱 APK location: ${apkFile.absolutePath}"
            println "📊 APK size: ${(apkFile.length() / 1024 / 1024).round(2)} MB"
        } else {
            throw new GradleException("❌ Release APK not found!")
        }
    }
}
```

**Version Bump Task:**
```gradle
task bumpVersion {
    group = 'versioning'
    description = 'Bump version code and name'
    
    doLast {
        def buildFile = file('build.gradle')
        def buildFileContent = buildFile.text
        
        // Extract current version
        def versionCodePattern = /versionCode (\d+)/
        def versionNamePattern = /versionName "([^"]+)"/
        
        def versionCodeMatcher = buildFileContent =~ versionCodePattern
        def versionNameMatcher = buildFileContent =~ versionNamePattern
        
        if (versionCodeMatcher.find() && versionNameMatcher.find()) {
            def currentVersionCode = versionCodeMatcher.group(1) as Integer
            def currentVersionName = versionNameMatcher.group(1)
            
            def newVersionCode = currentVersionCode + 1
            def versionParts = currentVersionName.split('\\.')
            def newVersionName = "${versionParts[0]}.${versionParts[1]}.${(versionParts[2] as Integer) + 1}"
            
            // Update build.gradle
            buildFileContent = buildFileContent.replaceAll(
                /versionCode \d+/, 
                "versionCode $newVersionCode"
            )
            buildFileContent = buildFileContent.replaceAll(
                /versionName "[^"]+"/, 
                "versionName \"$newVersionName\""
            )
            
            buildFile.text = buildFileContent
            
            println "✅ Version bumped: $currentVersionName ($currentVersionCode) → $newVersionName ($newVersionCode)"
        }
    }
}
```

**Automated Release Pipeline:**
```gradle
task createRelease {
    group = 'publishing'
    description = 'Complete release pipeline'
    
    doFirst {
        // Pre-release checks
        if (!file('keystore.properties').exists()) {
            throw new GradleException("❌ keystore.properties not found!")
        }
        
        // Run tests
        exec {
            commandLine './gradlew', 'test', 'lint'
        }
        
        println "✅ All checks passed, creating release..."
    }
    
    dependsOn = [
        'clean',
        'bumpVersion',
        'test',
        'lint',
        'bundleRelease',
        'assembleRelease'
    ]
    
    doLast {
        def bundleFile = file("build/outputs/bundle/release/app-release.aab")
        def apkFile = file("build/outputs/apk/release/app-release.apk")
        
        println "🎉 Release created successfully!"
        println "📦 Bundle: ${bundleFile.absolutePath}"
        println "📱 APK: ${apkFile.absolutePath}"
        println "🚀 Ready for upload to Google Play!"
    }
}

// Ensure proper task ordering
tasks.named('bumpVersion').configure {
    mustRunAfter 'clean'
}
tasks.named('test').configure {
    mustRunAfter 'bumpVersion'
}
tasks.named('bundleRelease').configure {
    mustRunAfter 'test'
}
```

#### Security Best Practices

**Keystore Security:**
```gradle
// ✅ Good: Use properties file
def keystorePropertiesFile = rootProject.file("keystore.properties")

// ✅ Good: Use environment variables
storePassword System.getenv("KEYSTORE_PASSWORD")

// ❌ Bad: Hardcode credentials
storePassword "my_password" // Never do this!

// ✅ Good: Check if keystore exists
if (keystorePropertiesFile.exists()) {
    signingConfig signingConfigs.release
}

// ✅ Good: Separate keystores for different environments
signingConfigs {
    debug { /* debug keystore */ }
    staging { /* staging keystore */ }
    release { /* production keystore */ }
}
```

**CI/CD Security:**
```gradle
// Use encrypted environment variables in CI
android {
    signingConfigs {
        release {
            storeFile file(System.getenv("ENCRYPTED_KEYSTORE_PATH"))
            storePassword System.getenv("ENCRYPTED_KEYSTORE_PASSWORD")
            keyAlias System.getenv("ENCRYPTED_KEY_ALIAS")
            keyPassword System.getenv("ENCRYPTED_KEY_PASSWORD")
        }
    }
}

// Validate signing configuration
task validateSigning {
    doLast {
        android.signingConfigs.release.with {
            if (!storeFile?.exists()) {
                throw new GradleException("Keystore file not found: ${storeFile}")
            }
            if (!storePassword) {
                throw new GradleException("Store password not provided")
            }
            if (!keyAlias) {
                throw new GradleException("Key alias not provided")
            }
            if (!keyPassword) {
                throw new GradleException("Key password not provided")
            }
        }
        println "✅ Signing configuration validated"
    }
}
```

> **💡 Tip:** Always keep your keystore file and passwords secure. Losing your keystore means you can't update your app on Google Play!

> **⚠️ Warning:** Never commit keystore files or passwords to version control. Use .gitignore to exclude sensitive files.

This comprehensive coverage of intermediate Gradle topics provides the foundation for managing complex Android projects with multiple modules, custom build logic, thorough testing, and secure publishing processes.

---

## 5. Advanced Topics

### Custom Plugin Development

*[Content to be implemented in subsequent tasks]*

### Advanced Scripting Techniques

*[Content to be implemented in subsequent tasks]*

### Build Logic Organization

*[Content to be implemented in subsequent tasks]*

### Composite Builds

*[Content to be implemented in subsequent tasks]*

### Gradle Properties and Configuration

*[Content to be implemented in subsequent tasks]*

---

## 6. Expert-Level Techniques

### Performance Optimization Strategies

*[Content to be implemented in subsequent tasks]*

### Custom Build Logic Implementation

*[Content to be implemented in subsequent tasks]*

### CI/CD Integration

*[Content to be implemented in subsequent tasks]*

### Advanced Dependency Management

*[Content to be implemented in subsequent tasks]*

### Build Caching Strategies

*[Content to be implemented in subsequent tasks]*

---

## 7. Performance Optimization

### Build Performance Analysis

*[Content to be implemented in subsequent tasks]*

### Caching Strategies

*[Content to be implemented in subsequent tasks]*

### Parallel Execution

*[Content to be implemented in subsequent tasks]*

### Memory and Resource Optimization

*[Content to be implemented in subsequent tasks]*

---

## 8. Cross-Platform Integration

### Flutter-Gradle Integration

*[Content to be implemented in subsequent tasks]*

### React Native Considerations

*[Content to be implemented in subsequent tasks]*

### Platform-Specific Configurations

*[Content to be implemented in subsequent tasks]*

### Cross-Platform Dependency Management

*[Content to be implemented in subsequent tasks]*

---

## 9. Troubleshooting & Best Practices

### Common Build Issues

*[Content to be implemented in subsequent tasks]*

### Debugging Techniques

*[Content to be implemented in subsequent tasks]*

### Industry Best Practices

*[Content to be implemented in subsequent tasks]*

### Comprehensive Troubleshooting Guide

*[Content to be implemented in subsequent tasks]*

---

## 10. Reference Section

### Gradle DSL Reference

*[Content to be implemented in subsequent tasks]*

### Quick Reference Tables

*[Content to be implemented in subsequent tasks]*

### Cheat Sheets

*[Content to be implemented in subsequent tasks]*

### Version Compatibility Guide

*[Content to be implemented in subsequent tasks]*

### Migration Guides

*[Content to be implemented in subsequent tasks]*

---

## About This Tutorial

This comprehensive Gradle tutorial is designed to take you from beginner to expert level in Android Gradle development. Each section builds upon the previous one, providing practical examples and real-world scenarios.

**Last Updated:** [Date will be updated with content]  
**Gradle Version:** [Version will be specified with content]  
**Android Gradle Plugin Version:** [Version will be specified with content]

---

*© 2025 - Complete Gradle Tutorial for Android Development*
