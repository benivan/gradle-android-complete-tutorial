# Complete Gradle Tutorial for Android Development

<div align="center">

![Gradle Logo](https://gradle.org/images/gradle-knowledge-graph-logo.png)

**A comprehensive guide covering Gradle from beginner to expert level for Android developers**

---

### 👨‍💻 Author

**Vikash Kumar**  
Senior Android Developer & Technical Writer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/disvikash/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:itsmevikash09@gmail.com)

*Passionate about Android development, build optimization, and sharing knowledge with the developer community*

</div>

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
// Example: Complete Android app build.gradle file
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
    id 'kotlin-kapt'
    id 'dagger.hilt.android.plugin'
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
        vectorDrawables.useSupportLibrary = true
        
        // Custom build config fields
        buildConfigField "String", "API_BASE_URL", '"https://api.example.com"'
        buildConfigField "boolean", "ENABLE_LOGGING", "true"
        
        // Custom resource values
        resValue "string", "app_name", "My Awesome App"
    }
    
    buildTypes {
        debug {
            debuggable true
            applicationIdSuffix ".debug"
            versionNameSuffix "-DEBUG"
            buildConfigField "String", "API_BASE_URL", '"https://api-dev.example.com"'
        }
        
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            buildConfigField "String", "API_BASE_URL", '"https://api.example.com"'
            buildConfigField "boolean", "ENABLE_LOGGING", "false"
        }
    }
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    
    kotlinOptions {
        jvmTarget = '1.8'
    }
    
    buildFeatures {
        viewBinding true
        buildConfig true
    }
}

dependencies {
    // Core Android dependencies
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.10.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    
    // Architecture components
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-livedata-ktx:2.7.0'
    implementation 'androidx.navigation:navigation-fragment-ktx:2.7.5'
    implementation 'androidx.navigation:navigation-ui-ktx:2.7.5'
    
    // Dependency injection
    implementation 'com.google.dagger:hilt-android:2.48'
    kapt 'com.google.dagger:hilt-compiler:2.48'
    
    // Network
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.12.0'
    
    // Testing
    testImplementation 'junit:junit:4.13.2'
    testImplementation 'org.mockito:mockito-core:5.6.0'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
}
```

**Real-World Project Example - E-commerce App:**

```gradle
// Complete build.gradle for an e-commerce Android app
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
    id 'kotlin-kapt'
    id 'dagger.hilt.android.plugin'
    id 'androidx.navigation.safeargs.kotlin'
    id 'kotlin-parcelize'
}

android {
    namespace 'com.example.ecommerce'
    compileSdk 34

    defaultConfig {
        applicationId "com.example.ecommerce"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
        
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables.useSupportLibrary = true
        
        // API configuration
        buildConfigField "String", "BASE_URL", '"https://api.ecommerce.com/v1/"'
        buildConfigField "String", "PAYMENT_API_URL", '"https://payments.ecommerce.com/"'
        buildConfigField "int", "NETWORK_TIMEOUT", "30"
        
        // Feature flags
        buildConfigField "boolean", "ENABLE_ANALYTICS", "true"
        buildConfigField "boolean", "ENABLE_CRASH_REPORTING", "true"
        buildConfigField "boolean", "ENABLE_PUSH_NOTIFICATIONS", "true"
        
        // App configuration
        resValue "string", "app_name", "ECommerce"
        resValue "string", "facebook_app_id", "123456789"
        resValue "string", "google_maps_key", "AIzaSyExample123"
    }
    
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        
        release {
            storeFile file(project.hasProperty('RELEASE_STORE_FILE') ? RELEASE_STORE_FILE : 'release.keystore')
            storePassword project.hasProperty('RELEASE_STORE_PASSWORD') ? RELEASE_STORE_PASSWORD : ''
            keyAlias project.hasProperty('RELEASE_KEY_ALIAS') ? RELEASE_KEY_ALIAS : ''
            keyPassword project.hasProperty('RELEASE_KEY_PASSWORD') ? RELEASE_KEY_PASSWORD : ''
        }
    }
    
    buildTypes {
        debug {
            debuggable true
            applicationIdSuffix ".debug"
            versionNameSuffix "-DEBUG"
            signingConfig signingConfigs.debug
            
            // Debug-specific configuration
            buildConfigField "String", "BASE_URL", '"https://api-dev.ecommerce.com/v1/"'
            buildConfigField "boolean", "ENABLE_LOGGING", "true"
            buildConfigField "boolean", "ENABLE_ANALYTICS", "false"
            
            resValue "string", "app_name", "ECommerce Debug"
        }
        
        staging {
            initWith debug
            applicationIdSuffix ".staging"
            versionNameSuffix "-STAGING"
            
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            
            buildConfigField "String", "BASE_URL", '"https://api-staging.ecommerce.com/v1/"'
            buildConfigField "boolean", "ENABLE_ANALYTICS", "true"
            
            resValue "string", "app_name", "ECommerce Staging"
        }
        
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
            
            buildConfigField "String", "BASE_URL", '"https://api.ecommerce.com/v1/"'
            buildConfigField "boolean", "ENABLE_LOGGING", "false"
            
            resValue "string", "app_name", "ECommerce"
        }
    }
    
    flavorDimensions "version"
    productFlavors {
        free {
            dimension "version"
            applicationIdSuffix ".free"
            versionNameSuffix "-free"
            
            buildConfigField "boolean", "IS_PREMIUM", "false"
            buildConfigField "int", "MAX_CART_ITEMS", "5"
            buildConfigField "boolean", "ENABLE_ADS", "true"
            
            resValue "string", "app_name_suffix", " Free"
            resValue "color", "primary_color", "#FF9800"
        }
        
        premium {
            dimension "version"
            applicationIdSuffix ".premium"
            versionNameSuffix "-premium"
            
            buildConfigField "boolean", "IS_PREMIUM", "true"
            buildConfigField "int", "MAX_CART_ITEMS", "999"
            buildConfigField "boolean", "ENABLE_ADS", "false"
            
            resValue "string", "app_name_suffix", " Premium"
            resValue "color", "primary_color", "#2196F3"
        }
    }
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    
    kotlinOptions {
        jvmTarget = '1.8'
        freeCompilerArgs += [
            '-opt-in=kotlin.RequiresOptIn',
            '-Xjvm-default=all'
        ]
    }
    
    buildFeatures {
        viewBinding true
        dataBinding true
        buildConfig true
    }
    
    packagingOptions {
        resources {
            excludes += [
                'META-INF/DEPENDENCIES',
                'META-INF/LICENSE',
                'META-INF/LICENSE.txt',
                'META-INF/NOTICE',
                'META-INF/NOTICE.txt'
            ]
        }
    }
    
    testOptions {
        unitTests {
            includeAndroidResources = true
            returnDefaultValues = true
        }
        animationsDisabled = true
    }
}

dependencies {
    // Core Android
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.10.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0'
    
    // Architecture Components
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-livedata-ktx:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.7.0'
    implementation 'androidx.navigation:navigation-fragment-ktx:2.7.5'
    implementation 'androidx.navigation:navigation-ui-ktx:2.7.5'
    
    // Room Database
    implementation 'androidx.room:room-runtime:2.6.0'
    implementation 'androidx.room:room-ktx:2.6.0'
    kapt 'androidx.room:room-compiler:2.6.0'
    
    // Dependency Injection
    implementation 'com.google.dagger:hilt-android:2.48'
    kapt 'com.google.dagger:hilt-compiler:2.48'
    
    // Network
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:okhttp:4.12.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.12.0'
    
    // Image Loading
    implementation 'com.github.bumptech.glide:glide:4.16.0'
    kapt 'com.github.bumptech.glide:compiler:4.16.0'
    
    // UI Components
    implementation 'androidx.recyclerview:recyclerview:1.3.2'
    implementation 'androidx.viewpager2:viewpager2:1.0.0'
    implementation 'com.google.android.flexbox:flexbox:3.0.0'
    
    // Payment & Maps (flavor-specific)
    freeImplementation 'com.google.android.gms:play-services-ads:22.5.0'
    implementation 'com.google.android.gms:play-services-maps:18.2.0'
    implementation 'com.google.android.gms:play-services-location:21.0.1'
    
    // Analytics & Crash Reporting
    implementation 'com.google.firebase:firebase-analytics-ktx:21.5.0'
    implementation 'com.google.firebase:firebase-crashlytics-ktx:18.6.0'
    implementation 'com.google.firebase:firebase-messaging-ktx:23.4.0'
    
    // Testing
    testImplementation 'junit:junit:4.13.2'
    testImplementation 'org.mockito:mockito-core:5.6.0'
    testImplementation 'org.mockito:mockito-inline:5.2.0'
    testImplementation 'androidx.arch.core:core-testing:2.2.0'
    testImplementation 'org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3'
    
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation 'androidx.test.espresso:espresso-contrib:3.5.1'
    androidTestImplementation 'androidx.test:runner:1.5.2'
    androidTestImplementation 'androidx.test:rules:1.5.0'
    androidTestImplementation 'com.google.dagger:hilt-android-testing:2.48'
    kaptAndroidTest 'com.google.dagger:hilt-compiler:2.48'
    
    // Debug tools
    debugImplementation 'com.squareup.leakcanary:leakcanary-android:2.12'
    debugImplementation 'com.facebook.flipper:flipper:0.212.0'
    debugImplementation 'com.facebook.soloader:soloader:0.10.5'
}

// Custom tasks for the e-commerce app
task generateBuildInfo {
    def outputDir = file("$buildDir/generated/buildinfo")
    
    inputs.property("versionName", android.defaultConfig.versionName)
    inputs.property("versionCode", android.defaultConfig.versionCode)
    outputs.dir(outputDir)
    
    doLast {
        outputDir.mkdirs()
        def buildInfoFile = new File(outputDir, "BuildInfo.kt")
        buildInfoFile.text = """
package com.example.ecommerce.buildinfo

object BuildInfo {
    const val VERSION_NAME = "${android.defaultConfig.versionName}"
    const val VERSION_CODE = ${android.defaultConfig.versionCode}
    const val BUILD_TIME = "${new Date()}"
    const val BUILD_TYPE = "${project.gradle.startParameter.taskNames.join(' ')}"
}
"""
    }
}

// Make the task run before compilation
android.applicationVariants.all { variant ->
    variant.registerJavaGeneratingTask(generateBuildInfo, generateBuildInfo.outputs.files)
}

// Custom APK naming
android.applicationVariants.all { variant ->
    variant.outputs.all { output ->
        def buildType = variant.buildType.name
        def flavor = variant.flavorName
        def versionName = variant.versionName
        def date = new Date().format('yyyy-MM-dd')
        
        outputFileName = "ECommerce-${flavor}-${buildType}-${versionName}-${date}.apk"
    }
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
        version: '1.0.0',
        classifier: 'sources'
    )
}
```

#### Real-World Dependency Examples

**Complete E-Commerce App Dependencies:**

```gradle
dependencies {
    // Core Android & UI
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.10.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.recyclerview:recyclerview:1.3.2'
    implementation 'androidx.viewpager2:viewpager2:1.0.0'
    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0'
    
    // Architecture Components
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-livedata-ktx:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.7.0'
    implementation 'androidx.navigation:navigation-fragment-ktx:2.7.5'
    implementation 'androidx.navigation:navigation-ui-ktx:2.7.5'
    implementation 'androidx.work:work-runtime-ktx:2.9.0'
    
    // Database - Room
    implementation 'androidx.room:room-runtime:2.6.0'
    implementation 'androidx.room:room-ktx:2.6.0'
    kapt 'androidx.room:room-compiler:2.6.0'
    
    // Dependency Injection - Hilt
    implementation 'com.google.dagger:hilt-android:2.48'
    kapt 'com.google.dagger:hilt-compiler:2.48'
    implementation 'androidx.hilt:hilt-work:1.1.0'
    kapt 'androidx.hilt:hilt-compiler:1.1.0'
    
    // Network & API
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:okhttp:4.12.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.12.0'
    
    // Image Loading
    implementation 'com.github.bumptech.glide:glide:4.16.0'
    kapt 'com.github.bumptech.glide:compiler:4.16.0'
    
    // Payment Processing
    implementation 'com.stripe:stripe-android:20.34.0'
    implementation 'com.paypal.checkout:android-sdk:1.2.0'
    
    // Maps & Location
    implementation 'com.google.android.gms:play-services-maps:18.2.0'
    implementation 'com.google.android.gms:play-services-location:21.0.1'
    
    // Push Notifications & Analytics
    implementation 'com.google.firebase:firebase-messaging-ktx:23.4.0'
    implementation 'com.google.firebase:firebase-analytics-ktx:21.5.0'
    implementation 'com.google.firebase:firebase-crashlytics-ktx:18.6.0'
    
    // Social Login
    implementation 'com.google.android.gms:play-services-auth:20.7.0'
    implementation 'com.facebook.android:facebook-android-sdk:16.2.0'
    
    // QR Code Scanning
    implementation 'com.google.mlkit:barcode-scanning:17.2.0'
    implementation 'androidx.camera:camera-core:1.3.1'
    implementation 'androidx.camera:camera-camera2:1.3.1'
    implementation 'androidx.camera:camera-lifecycle:1.3.1'
    implementation 'androidx.camera:camera-view:1.3.1'
    
    // UI Enhancements
    implementation 'com.airbnb.android:lottie:6.2.0'
    implementation 'com.github.chrisbanes:PhotoView:2.3.0'
    implementation 'com.google.android.flexbox:flexbox:3.0.0'
    
    // Utilities
    implementation 'com.jakewharton.timber:timber:5.0.1'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3'
    
    // Testing
    testImplementation 'junit:junit:4.13.2'
    testImplementation 'org.mockito:mockito-core:5.6.0'
    testImplementation 'androidx.arch.core:core-testing:2.2.0'
    testImplementation 'org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3'
    
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation 'com.google.dagger:hilt-android-testing:2.48'
    kaptAndroidTest 'com.google.dagger:hilt-compiler:2.48'
    
    // Debug Tools
    debugImplementation 'com.squareup.leakcanary:leakcanary-android:2.12'
    debugImplementation 'com.facebook.flipper:flipper:0.212.0'
    debugImplementation 'com.facebook.soloader:soloader:0.10.5'
}
```

**News/Media App Dependencies:**

```gradle
dependencies {
    // Core Android
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.10.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    
    // Architecture Components
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-livedata-ktx:2.7.0'
    implementation 'androidx.navigation:navigation-fragment-ktx:2.7.5'
    implementation 'androidx.navigation:navigation-ui-ktx:2.7.5'
    implementation 'androidx.paging:paging-runtime-ktx:3.2.1'
    
    // Database
    implementation 'androidx.room:room-runtime:2.6.0'
    implementation 'androidx.room:room-ktx:2.6.0'
    implementation 'androidx.room:room-paging:2.6.0'
    kapt 'androidx.room:room-compiler:2.6.0'
    
    // Network
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:okhttp:4.12.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.12.0'
    
    // Image & Media
    implementation 'com.github.bumptech.glide:glide:4.16.0'
    kapt 'com.github.bumptech.glide:compiler:4.16.0'
    implementation 'com.google.android.exoplayer:exoplayer:2.19.1'
    implementation 'com.google.android.exoplayer:extension-okhttp:2.19.1'
    
    // Web Content
    implementation 'androidx.webkit:webkit:1.8.0'
    implementation 'org.jsoup:jsoup:1.16.2'
    
    // RSS/XML Parsing
    implementation 'com.rometools:rome:2.1.0'
    implementation 'com.tickaroo.tikxml:annotation:0.8.13'
    implementation 'com.tickaroo.tikxml:core:0.8.13'
    kapt 'com.tickaroo.tikxml:processor:0.8.13'
    
    // Text Processing
    implementation 'org.commonmark:commonmark:0.21.0'
    implementation 'org.commonmark:commonmark-ext-gfm-tables:0.21.0'
    
    // Offline Reading
    implementation 'androidx.work:work-runtime-ktx:2.9.0'
    implementation 'com.google.android.gms:play-services-mlkit-text-recognition:19.0.0'
    
    // Social Sharing
    implementation 'androidx.browser:browser:1.7.0'
    implementation 'com.google.android.gms:play-services-auth:20.7.0'
    
    // Analytics & Ads
    implementation 'com.google.firebase:firebase-analytics-ktx:21.5.0'
    implementation 'com.google.android.gms:play-services-ads:22.5.0'
    
    // Testing
    testImplementation 'junit:junit:4.13.2'
    testImplementation 'org.mockito:mockito-core:5.6.0'
    testImplementation 'androidx.paging:paging-common-ktx:3.2.1'
    
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
}
```

**Banking/Finance App Dependencies:**

```gradle
dependencies {
    // Core Android
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.10.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    
    // Security & Encryption
    implementation 'androidx.security:security-crypto:1.1.0-alpha06'
    implementation 'androidx.biometric:biometric:1.1.0'
    implementation 'com.scottyab.rootbeer:rootbeer-lib:0.1.0'
    implementation 'com.github.javiersantos:PiracyChecker:1.2.8'
    
    // Network with Security
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:okhttp:4.12.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.12.0'
    implementation 'com.datatheorem.android.trustkit:trustkit:1.1.5'
    
    // Secure Database
    implementation 'androidx.room:room-runtime:2.6.0'
    implementation 'androidx.room:room-ktx:2.6.0'
    kapt 'androidx.room:room-compiler:2.6.0'
    implementation 'net.zetetic:android-database-sqlcipher:4.5.4'
    
    // QR Code & Document Scanning
    implementation 'com.google.mlkit:barcode-scanning:17.2.0'
    implementation 'com.google.mlkit:document-scanner:16.0.0-beta1'
    implementation 'androidx.camera:camera-core:1.3.1'
    implementation 'androidx.camera:camera-camera2:1.3.1'
    implementation 'androidx.camera:camera-lifecycle:1.3.1'
    implementation 'androidx.camera:camera-view:1.3.1'
    
    // Charts & Visualization
    implementation 'com.github.PhilJay:MPAndroidChart:v3.1.0'
    implementation 'com.github.mikephil.charting:MPAndroidChart:v3.1.0'
    
    // PDF Generation
    implementation 'com.itextpdf:itext7-core:7.2.5'
    implementation 'com.tom-roush:pdfbox-android:2.0.27.0'
    
    // Push Notifications (Secure)
    implementation 'com.google.firebase:firebase-messaging-ktx:23.4.0'
    
    // Analytics (Privacy-focused)
    implementation 'com.google.firebase:firebase-analytics-ktx:21.5.0'
    
    // Testing with Security Focus
    testImplementation 'junit:junit:4.13.2'
    testImplementation 'org.mockito:mockito-core:5.6.0'
    testImplementation 'androidx.arch.core:core-testing:2.2.0'
    
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation 'androidx.test:runner:1.5.2'
}
```

#### Advanced Dependency Management Techniques

**Using BOMs (Bill of Materials):**

```gradle
dependencies {
    // Firebase BOM - manages all Firebase library versions
    implementation platform('com.google.firebase:firebase-bom:32.7.0')
    implementation 'com.google.firebase:firebase-analytics-ktx'
    implementation 'com.google.firebase:firebase-crashlytics-ktx'
    implementation 'com.google.firebase:firebase-messaging-ktx'
    implementation 'com.google.firebase:firebase-auth-ktx'
    implementation 'com.google.firebase:firebase-firestore-ktx'
    
    // Compose BOM
    implementation platform('androidx.compose:compose-bom:2023.10.01')
    implementation 'androidx.compose.ui:ui'
    implementation 'androidx.compose.ui:ui-tooling-preview'
    implementation 'androidx.compose.material3:material3'
    implementation 'androidx.compose.runtime:runtime-livedata'
    
    // OkHttp BOM
    implementation platform('com.squareup.okhttp3:okhttp-bom:4.12.0')
    implementation 'com.squareup.okhttp3:okhttp'
    implementation 'com.squareup.okhttp3:logging-interceptor'
    implementation 'com.squareup.okhttp3:okhttp-urlconnection'
}
```

**Dependency Exclusions and Conflict Resolution:**

```gradle
dependencies {
    implementation('com.example.library:library:1.0.0') {
        // Exclude specific transitive dependencies
        exclude group: 'com.google.guava', module: 'guava'
        exclude group: 'org.apache.httpcomponents'
        
        // Exclude all transitive dependencies
        transitive = false
    }
    
    // Force specific versions to resolve conflicts
    implementation('com.google.code.gson:gson:2.10.1') {
        force = true
    }
    
    // Use specific version for all modules in a group
    implementation 'org.jetbrains.kotlin:kotlin-stdlib:1.9.10'
    implementation 'org.jetbrains.kotlin:kotlin-reflect:1.9.10'
}

// Global dependency resolution strategy
configurations.all {
    resolutionStrategy {
        // Force specific versions globally
        force 'com.google.code.gson:gson:2.10.1'
        force 'org.jetbrains.kotlin:kotlin-stdlib:1.9.10'
        
        // Handle version conflicts dynamically
        eachDependency { details ->
            if (details.requested.group == 'org.jetbrains.kotlin') {
                details.useVersion '1.9.10'
                details.because 'Ensure consistent Kotlin version'
            }
            
            if (details.requested.group == 'androidx.lifecycle') {
                details.useVersion '2.7.0'
                details.because 'Use latest stable lifecycle version'
            }
        }
        
        // Cache settings for better performance
        cacheDynamicVersionsFor 10, 'minutes'
        cacheChangingModulesFor 4, 'hours'
        
        // Fail on version conflict (strict mode)
        // failOnVersionConflict()
    }
}
```

**Flavor and Build Type Specific Dependencies:**

```gradle
dependencies {
    // Common dependencies for all variants
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    
    // Free version specific
    freeImplementation 'com.google.android.gms:play-services-ads:22.5.0'
    freeImplementation 'com.google.android.ump:user-messaging-platform:2.1.0'
    
    // Premium version specific
    premiumImplementation 'com.example:premium-features:1.0.0'
    premiumImplementation 'com.example:advanced-analytics:2.0.0'
    
    // Debug build type specific
    debugImplementation 'com.squareup.leakcanary:leakcanary-android:2.12'
    debugImplementation 'com.facebook.flipper:flipper:0.212.0'
    debugImplementation 'com.facebook.soloader:soloader:0.10.5'
    debugImplementation 'com.facebook.flipper:flipper-network-plugin:0.212.0'
    debugImplementation 'com.facebook.flipper:flipper-leakcanary2-plugin:0.212.0'
    
    // Release build type specific
    releaseImplementation 'com.google.firebase:firebase-crashlytics-ktx:18.6.0'
    releaseImplementation 'com.google.firebase:firebase-perf-ktx:20.5.1'
    
    // Staging build type specific
    stagingImplementation 'com.example:staging-tools:1.0.0'
    
    // Combination of flavor + build type
    freeDebugImplementation 'com.example:free-debug-tools:1.0.0'
    premiumReleaseImplementation 'com.example:premium-analytics:1.0.0'
    
    // Test dependencies
    testImplementation 'junit:junit:4.13.2'
    testImplementation 'org.mockito:mockito-core:5.6.0'
    testImplementation 'org.mockito:mockito-inline:5.2.0'
    testImplementation 'androidx.arch.core:core-testing:2.2.0'
    testImplementation 'org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3'
    testImplementation 'com.squareup.okhttp3:mockwebserver:4.12.0'
    
    // Android test dependencies
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation 'androidx.test.espresso:espresso-contrib:3.5.1'
    androidTestImplementation 'androidx.test.espresso:espresso-intents:3.5.1'
    androidTestImplementation 'androidx.test:runner:1.5.2'
    androidTestImplementation 'androidx.test:rules:1.5.0'
    
    // Annotation processors
    kapt 'androidx.room:room-compiler:2.6.0'
    kapt 'com.google.dagger:hilt-compiler:2.48'
    kapt 'com.github.bumptech.glide:compiler:4.16.0'
    
    // Android test annotation processors
    kaptAndroidTest 'com.google.dagger:hilt-compiler:2.48'
}
```
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

#### Real-World Multi-Module Project Examples

**Complete E-Commerce App Multi-Module Structure:**

```
ECommerceApp/
├── settings.gradle
├── build.gradle                    (root project)
├── buildSrc/                      (build logic)
│   └── src/main/kotlin/
│       ├── Dependencies.kt
│       └── Versions.kt
├── app/                           (main app module)
│   ├── build.gradle
│   └── src/
├── core/                          (shared utilities)
│   ├── common/                    (common utilities)
│   ├── network/                   (network layer)
│   ├── database/                  (database setup)
│   ├── ui/                        (common UI components)
│   └── testing/                   (test utilities)
├── data/                          (data layer)
│   ├── build.gradle
│   └── src/
├── domain/                        (business logic)
│   ├── build.gradle
│   └── src/
├── feature/                       (feature modules)
│   ├── authentication/
│   ├── product-catalog/
│   ├── shopping-cart/
│   ├── checkout/
│   ├── user-profile/
│   └── order-history/
└── shared/                        (shared resources)
    ├── design-system/
    └── resources/
```

**Root settings.gradle:**
```gradle
rootProject.name = 'ECommerceApp'

// App module
include ':app'

// Core modules
include ':core:common'
include ':core:network'
include ':core:database'
include ':core:ui'
include ':core:testing'

// Data and Domain layers
include ':data'
include ':domain'

// Feature modules
include ':feature:authentication'
include ':feature:product-catalog'
include ':feature:shopping-cart'
include ':feature:checkout'
include ':feature:user-profile'
include ':feature:order-history'

// Shared modules
include ':shared:design-system'
include ':shared:resources'

// Enable Gradle's type-safe project accessors
enableFeaturePreview('TYPESAFE_PROJECT_ACCESSORS')
```

**Root build.gradle with Version Catalog:**
```gradle
// build.gradle (root)
buildscript {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

plugins {
    id 'com.android.application' version '8.1.2' apply false
    id 'com.android.library' version '8.1.2' apply false
    id 'org.jetbrains.kotlin.android' version '1.9.10' apply false
    id 'com.google.dagger.hilt.android' version '2.48' apply false
    id 'androidx.navigation.safeargs.kotlin' version '2.7.5' apply false
    id 'com.google.gms.google-services' version '4.4.0' apply false
    id 'com.google.firebase.crashlytics' version '2.9.9' apply false
}

// Common configuration for all Android modules
subprojects {
    afterEvaluate { project ->
        if (project.hasProperty('android')) {
            android {
                compileSdk 34
                
                defaultConfig {
                    minSdk 24
                    targetSdk 34
                    testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
                }
                
                compileOptions {
                    sourceCompatibility JavaVersion.VERSION_1_8
                    targetCompatibility JavaVersion.VERSION_1_8
                }
                
                if (project.hasProperty('kotlinOptions')) {
                    kotlinOptions {
                        jvmTarget = '1.8'
                        freeCompilerArgs += [
                            '-opt-in=kotlin.RequiresOptIn',
                            '-Xjvm-default=all'
                        ]
                    }
                }
                
                testOptions {
                    unitTests {
                        includeAndroidResources = true
                        returnDefaultValues = true
                    }
                }
            }
        }
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

**App Module (app/build.gradle):**
```gradle
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
    id 'kotlin-kapt'
    id 'dagger.hilt.android.plugin'
    id 'androidx.navigation.safeargs.kotlin'
    id 'com.google.gms.google-services'
    id 'com.google.firebase.crashlytics'
}

android {
    namespace 'com.example.ecommerce'
    
    defaultConfig {
        applicationId "com.example.ecommerce"
        versionCode 1
        versionName "1.0.0"
        
        buildConfigField "String", "API_BASE_URL", '"https://api.ecommerce.com/"'
    }
    
    buildTypes {
        debug {
            debuggable true
            applicationIdSuffix ".debug"
            versionNameSuffix "-DEBUG"
            buildConfigField "String", "API_BASE_URL", '"https://api-dev.ecommerce.com/"'
        }
        
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
        }
    }
    
    buildFeatures {
        viewBinding true
        dataBinding true
        buildConfig true
    }
    
    dynamicFeatures = [
        ':feature:product-catalog',
        ':feature:checkout'
    ]
}

dependencies {
    // Core modules
    implementation projects.core.common
    implementation projects.core.network
    implementation projects.core.database
    implementation projects.core.ui
    
    // Data and Domain layers
    implementation projects.data
    implementation projects.domain
    
    // Feature modules (static)
    implementation projects.feature.authentication
    implementation projects.feature.userProfile
    implementation projects.feature.shoppingCart
    implementation projects.feature.orderHistory
    
    // Shared modules
    implementation projects.shared.designSystem
    implementation projects.shared.resources
    
    // Android core
    implementation libs.androidx.core.ktx
    implementation libs.androidx.appcompat
    implementation libs.material
    implementation libs.androidx.constraintlayout
    
    // Architecture components
    implementation libs.androidx.lifecycle.viewmodel.ktx
    implementation libs.androidx.lifecycle.livedata.ktx
    implementation libs.androidx.navigation.fragment.ktx
    implementation libs.androidx.navigation.ui.ktx
    
    // Dependency injection
    implementation libs.hilt.android
    kapt libs.hilt.compiler
    
    // Firebase
    implementation libs.firebase.analytics.ktx
    implementation libs.firebase.crashlytics.ktx
    implementation libs.firebase.messaging.ktx
    
    // Testing
    testImplementation projects.core.testing
    testImplementation libs.junit
    testImplementation libs.mockito.core
    testImplementation libs.androidx.arch.core.testing
    
    androidTestImplementation libs.androidx.test.ext.junit
    androidTestImplementation libs.androidx.test.espresso.core
    androidTestImplementation libs.hilt.android.testing
    kaptAndroidTest libs.hilt.compiler
    
    // Debug tools
    debugImplementation libs.leakcanary.android
    debugImplementation libs.flipper
    debugImplementation libs.soloader
}
```

**Core Common Module (core/common/build.gradle):**
```gradle
plugins {
    id 'com.android.library'
    id 'org.jetbrains.kotlin.android'
    id 'kotlin-kapt'
}

android {
    namespace 'com.example.ecommerce.core.common'
    
    buildFeatures {
        buildConfig true
    }
}

dependencies {
    // Kotlin
    api libs.kotlin.stdlib
    api libs.kotlinx.coroutines.android
    api libs.kotlinx.coroutines.core
    
    // Android core
    api libs.androidx.core.ktx
    api libs.androidx.appcompat
    api libs.androidx.lifecycle.runtime.ktx
    
    // Utilities
    api libs.timber
    
    // Testing utilities
    testImplementation libs.junit
    testImplementation libs.kotlinx.coroutines.test
    testImplementation libs.mockito.core
}
```

**Core Network Module (core/network/build.gradle):**
```gradle
plugins {
    id 'com.android.library'
    id 'org.jetbrains.kotlin.android'
    id 'kotlin-kapt'
    id 'kotlinx-serialization'
}

android {
    namespace 'com.example.ecommerce.core.network'
    
    buildFeatures {
        buildConfig true
    }
}

dependencies {
    implementation projects.core.common
    
    // Network
    api libs.retrofit.core
    api libs.retrofit.kotlin.serialization
    api libs.okhttp.logging
    api libs.kotlinx.serialization.json
    
    // Dependency injection
    implementation libs.hilt.android
    kapt libs.hilt.compiler
    
    // Testing
    testImplementation libs.junit
    testImplementation libs.mockito.core
    testImplementation libs.okhttp.mockwebserver
    testImplementation libs.kotlinx.coroutines.test
}
```

**Core Database Module (core/database/build.gradle):**
```gradle
plugins {
    id 'com.android.library'
    id 'org.jetbrains.kotlin.android'
    id 'kotlin-kapt'
}

android {
    namespace 'com.example.ecommerce.core.database'
    
    defaultConfig {
        // Room schema export
        javaCompileOptions {
            annotationProcessorOptions {
                arguments += ["room.schemaLocation": "$projectDir/schemas".toString()]
            }
        }
    }
}

dependencies {
    implementation projects.core.common
    
    // Room
    api libs.room.runtime
    api libs.room.ktx
    kapt libs.room.compiler
    
    // Dependency injection
    implementation libs.hilt.android
    kapt libs.hilt.compiler
    
    // Testing
    testImplementation libs.junit
    testImplementation libs.room.testing
    testImplementation libs.kotlinx.coroutines.test
}
```

**Feature Module Example (feature/authentication/build.gradle):**
```gradle
plugins {
    id 'com.android.library'
    id 'org.jetbrains.kotlin.android'
    id 'kotlin-kapt'
    id 'androidx.navigation.safeargs.kotlin'
}

android {
    namespace 'com.example.ecommerce.feature.authentication'
    
    buildFeatures {
        viewBinding true
        dataBinding true
    }
}

dependencies {
    // Core modules
    implementation projects.core.common
    implementation projects.core.network
    implementation projects.core.ui
    
    // Data and Domain
    implementation projects.data
    implementation projects.domain
    
    // Shared modules
    implementation projects.shared.designSystem
    implementation projects.shared.resources
    
    // Android UI
    implementation libs.androidx.fragment.ktx
    implementation libs.androidx.lifecycle.viewmodel.ktx
    implementation libs.androidx.navigation.fragment.ktx
    implementation libs.material
    
    // Authentication
    implementation libs.androidx.biometric
    implementation libs.play.services.auth
    implementation libs.facebook.android.sdk
    
    // Dependency injection
    implementation libs.hilt.android
    kapt libs.hilt.compiler
    
    // Testing
    testImplementation projects.core.testing
    testImplementation libs.junit
    testImplementation libs.mockito.core
    testImplementation libs.androidx.arch.core.testing
    testImplementation libs.kotlinx.coroutines.test
    
    androidTestImplementation libs.androidx.test.ext.junit
    androidTestImplementation libs.androidx.test.espresso.core
    androidTestImplementation libs.hilt.android.testing
    kaptAndroidTest libs.hilt.compiler
}
```

**Data Module (data/build.gradle):**
```gradle
plugins {
    id 'com.android.library'
    id 'org.jetbrains.kotlin.android'
    id 'kotlin-kapt'
    id 'kotlinx-serialization'
}

android {
    namespace 'com.example.ecommerce.data'
}

dependencies {
    // Core modules
    implementation projects.core.common
    implementation projects.core.network
    implementation projects.core.database
    
    // Domain layer
    implementation projects.domain
    
    // Paging
    implementation libs.androidx.paging.runtime.ktx
    
    // Dependency injection
    implementation libs.hilt.android
    kapt libs.hilt.compiler
    
    // Testing
    testImplementation projects.core.testing
    testImplementation libs.junit
    testImplementation libs.mockito.core
    testImplementation libs.kotlinx.coroutines.test
    testImplementation libs.androidx.paging.common.ktx
}
```

**Domain Module (domain/build.gradle):**
```gradle
plugins {
    id 'java-library'
    id 'org.jetbrains.kotlin.jvm'
}

java {
    sourceCompatibility = JavaVersion.VERSION_1_8
    targetCompatibility = JavaVersion.VERSION_1_8
}

dependencies {
    // Pure Kotlin/Java - no Android dependencies
    implementation libs.kotlin.stdlib
    implementation libs.kotlinx.coroutines.core
    
    // Dependency injection annotations
    implementation libs.javax.inject
    
    // Testing
    testImplementation libs.junit
    testImplementation libs.mockito.core
    testImplementation libs.kotlinx.coroutines.test
}
```

**Shared Design System Module (shared/design-system/build.gradle):**
```gradle
plugins {
    id 'com.android.library'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'com.example.ecommerce.shared.designsystem'
    
    buildFeatures {
        viewBinding true
        compose true
    }
    
    composeOptions {
        kotlinCompilerExtensionVersion libs.versions.compose.compiler.get()
    }
}

dependencies {
    implementation projects.core.common
    
    // UI
    api libs.material
    api libs.androidx.constraintlayout
    
    // Compose
    api platform(libs.compose.bom)
    api libs.compose.ui
    api libs.compose.ui.tooling.preview
    api libs.compose.material3
    api libs.compose.runtime.livedata
    
    // Image loading
    api libs.glide
    api libs.lottie
    
    // Testing
    testImplementation libs.junit
    androidTestImplementation libs.compose.ui.test.junit4
    debugImplementation libs.compose.ui.tooling
    debugImplementation libs.compose.ui.test.manifest
}
```

#### Advanced Multi-Module Techniques

**Dynamic Feature Modules:**

```gradle
// app/build.gradle
android {
    dynamicFeatures = [
        ':feature:premium-features',
        ':feature:advanced-analytics'
    ]
}

// feature/premium-features/build.gradle
plugins {
    id 'com.android.dynamic-feature'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'com.example.ecommerce.feature.premium'
}

dependencies {
    implementation project(':app')
    implementation projects.core.common
    implementation projects.shared.designSystem
}
```

**Composite Builds for Shared Libraries:**

```gradle
// settings.gradle
includeBuild '../shared-libraries/networking'
includeBuild '../shared-libraries/analytics'

// app/build.gradle
dependencies {
    implementation 'com.company:networking:1.0.0'
    implementation 'com.company:analytics:1.0.0'
}
```

**Module-Specific ProGuard Rules:**

```gradle
// feature/authentication/build.gradle
android {
    buildTypes {
        release {
            consumerProguardFiles 'consumer-rules.pro'
        }
    }
}
```

```proguard
# feature/authentication/consumer-rules.pro
-keep class com.example.ecommerce.feature.authentication.AuthApi { *; }
-keep class com.example.ecommerce.feature.authentication.model.** { *; }
```
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

#### Real-World Custom Task Examples

**1. API Documentation Generator Task:**
```gradle
task generateApiDocs {
    description = 'Generate API documentation from OpenAPI spec'
    group = 'documentation'
    
    def specFile = file('src/main/assets/api-spec.yaml')
    def outputDir = file("$buildDir/generated/docs")
    
    inputs.file(specFile)
    outputs.dir(outputDir)
    
    doLast {
        outputDir.mkdirs()
        
        // Parse OpenAPI spec and generate Kotlin interfaces
        def spec = new org.yaml.snakeyaml.Yaml().load(specFile.text)
        def apiFile = new File(outputDir, 'ApiEndpoints.kt')
        
        apiFile.text = """
package com.example.api.generated

object ApiEndpoints {
${spec.paths.collect { path, methods ->
    methods.collect { method, details ->
        "    const val ${method.toUpperCase()}_${path.replaceAll('/', '_').replaceAll('[{}]', '').toUpperCase()} = \"$path\""
    }.join('\n')
}.flatten().join('\n')}
}
"""
        
        println "Generated API documentation at ${apiFile.absolutePath}"
    }
}

// Make it run before compilation
preBuild.dependsOn generateApiDocs
```

**2. Asset Optimization Task:**
```gradle
task optimizeAssets {
    description = 'Optimize images and compress assets'
    group = 'optimization'
    
    def assetsDir = file('src/main/assets')
    def optimizedDir = file("$buildDir/optimized-assets")
    
    inputs.dir(assetsDir)
    outputs.dir(optimizedDir)
    
    doLast {
        optimizedDir.mkdirs()
        
        // Copy and optimize images
        fileTree(assetsDir).matching {
            include '**/*.png', '**/*.jpg', '**/*.jpeg'
        }.each { imageFile ->
            def relativePath = assetsDir.toPath().relativize(imageFile.toPath())
            def outputFile = new File(optimizedDir, relativePath.toString())
            outputFile.parentFile.mkdirs()
            
            // Simple optimization (in real project, use ImageOptim or similar)
            if (imageFile.name.endsWith('.png')) {
                exec {
                    commandLine 'pngcrush', '-reduce', imageFile.absolutePath, outputFile.absolutePath
                    ignoreExitValue true
                }
            } else {
                // Copy as-is for now
                outputFile.bytes = imageFile.bytes
            }
            
            println "Optimized: ${imageFile.name} -> ${outputFile.name}"
        }
        
        // Compress JSON files
        fileTree(assetsDir).matching {
            include '**/*.json'
        }.each { jsonFile ->
            def relativePath = assetsDir.toPath().relativize(jsonFile.toPath())
            def outputFile = new File(optimizedDir, relativePath.toString())
            outputFile.parentFile.mkdirs()
            
            // Minify JSON
            def json = new groovy.json.JsonSlurper().parse(jsonFile)
            def minified = new groovy.json.JsonBuilder(json).toString()
            outputFile.text = minified
            
            println "Minified JSON: ${jsonFile.name}"
        }
    }
}
```

**3. Database Schema Generator:**
```gradle
task generateDatabaseSchema {
    description = 'Generate Room database schema documentation'
    group = 'documentation'
    
    def schemaDir = file('schemas')
    def outputFile = file("$buildDir/generated/docs/database-schema.md")
    
    inputs.dir(schemaDir)
    outputs.file(outputFile)
    
    doLast {
        outputFile.parentFile.mkdirs()
        
        def markdown = new StringBuilder()
        markdown.append("# Database Schema Documentation\n\n")
        markdown.append("Generated on: ${new Date()}\n\n")
        
        // Process Room schema files
        fileTree(schemaDir).matching {
            include '**/*.json'
        }.sort { it.name }.each { schemaFile ->
            def schema = new groovy.json.JsonSlurper().parse(schemaFile)
            def version = schema.database.version
            
            markdown.append("## Version ${version}\n\n")
            
            schema.database.entities.each { entity ->
                markdown.append("### ${entity.tableName}\n\n")
                markdown.append("| Column | Type | Nullable | Primary Key |\n")
                markdown.append("|--------|------|----------|-------------|\n")
                
                entity.fields.each { field ->
                    def nullable = field.notNull ? "No" : "Yes"
                    def primaryKey = entity.primaryKey.columnNames.contains(field.columnName) ? "Yes" : "No"
                    markdown.append("| ${field.columnName} | ${field.affinity} | ${nullable} | ${primaryKey} |\n")
                }
                markdown.append("\n")
            }
        }
        
        outputFile.text = markdown.toString()
        println "Generated database schema documentation: ${outputFile.absolutePath}"
    }
}
```

**4. Localization Validation Task:**
```gradle
task validateTranslations {
    description = 'Validate translation completeness across all locales'
    group = 'verification'
    
    def resDir = file('src/main/res')
    
    inputs.dir(resDir)
    
    doLast {
        def baseStrings = [:]
        def baseStringsFile = file("${resDir}/values/strings.xml")
        
        if (baseStringsFile.exists()) {
            def xml = new XmlSlurper().parse(baseStringsFile)
            xml.string.each { string ->
                baseStrings[string.@name.toString()] = string.text()
            }
        }
        
        def missingTranslations = [:]
        
        // Check all locale-specific string files
        fileTree(resDir).matching {
            include 'values-*/strings.xml'
        }.each { localeFile ->
            def locale = localeFile.parentFile.name.replace('values-', '')
            def localeStrings = [:]
            
            def xml = new XmlSlurper().parse(localeFile)
            xml.string.each { string ->
                localeStrings[string.@name.toString()] = string.text()
            }
            
            def missing = baseStrings.keySet() - localeStrings.keySet()
            if (!missing.isEmpty()) {
                missingTranslations[locale] = missing
            }
        }
        
        if (missingTranslations.isEmpty()) {
            println "✅ All translations are complete!"
        } else {
            println "❌ Missing translations found:"
            missingTranslations.each { locale, missing ->
                println "  ${locale}: ${missing.join(', ')}"
            }
            throw new GradleException("Translation validation failed")
        }
    }
}

// Run validation before building
preBuild.dependsOn validateTranslations
```

**5. Code Quality Report Generator:**
```gradle
task generateQualityReport {
    description = 'Generate comprehensive code quality report'
    group = 'reporting'
    
    def reportDir = file("$buildDir/reports/quality")
    
    outputs.dir(reportDir)
    
    doLast {
        reportDir.mkdirs()
        
        def report = new StringBuilder()
        report.append("# Code Quality Report\n\n")
        report.append("Generated: ${new Date()}\n\n")
        
        // Analyze source files
        def kotlinFiles = fileTree('src/main/java').matching { include '**/*.kt' }
        def totalLines = 0
        def totalFiles = 0
        def complexityScore = 0
        
        kotlinFiles.each { file ->
            totalFiles++
            def lines = file.readLines()
            totalLines += lines.size()
            
            // Simple complexity analysis
            lines.each { line ->
                if (line.contains('if ') || line.contains('when ') || line.contains('for ') || line.contains('while ')) {
                    complexityScore++
                }
            }
        }
        
        report.append("## Statistics\n\n")
        report.append("- Total Kotlin files: ${totalFiles}\n")
        report.append("- Total lines of code: ${totalLines}\n")
        report.append("- Average lines per file: ${totalFiles > 0 ? (totalLines / totalFiles).round(2) : 0}\n")
        report.append("- Complexity score: ${complexityScore}\n\n")
        
        // Check for common issues
        report.append("## Code Issues\n\n")
        
        def issues = []
        kotlinFiles.each { file ->
            file.eachLine { line, lineNumber ->
                if (line.contains('TODO') || line.contains('FIXME')) {
                    issues.add("${file.name}:${lineNumber} - ${line.trim()}")
                }
                if (line.length() > 120) {
                    issues.add("${file.name}:${lineNumber} - Line too long (${line.length()} chars)")
                }
            }
        }
        
        if (issues.isEmpty()) {
            report.append("No issues found! 🎉\n")
        } else {
            issues.each { issue ->
                report.append("- ${issue}\n")
            }
        }
        
        def reportFile = new File(reportDir, 'quality-report.md')
        reportFile.text = report.toString()
        
        println "Quality report generated: ${reportFile.absolutePath}"
    }
}
```

**6. Custom APK Signing and Distribution Task:**
```gradle
task signAndDistributeApk {
    description = 'Sign APK and prepare for distribution'
    group = 'distribution'
    
    dependsOn assembleRelease
    
    doLast {
        def releaseApk = file("$buildDir/outputs/apk/release/app-release-unsigned.apk")
        def signedApk = file("$buildDir/outputs/apk/release/app-release-signed.apk")
        def distributionDir = file("$buildDir/distribution")
        
        distributionDir.mkdirs()
        
        // Sign APK (assuming keystore is configured)
        exec {
            commandLine 'jarsigner',
                '-verbose',
                '-sigalg', 'SHA1withRSA',
                '-digestalg', 'SHA1',
                '-keystore', project.hasProperty('RELEASE_STORE_FILE') ? RELEASE_STORE_FILE : 'release.keystore',
                '-storepass', project.hasProperty('RELEASE_STORE_PASSWORD') ? RELEASE_STORE_PASSWORD : 'password',
                '-keypass', project.hasProperty('RELEASE_KEY_PASSWORD') ? RELEASE_KEY_PASSWORD : 'password',
                releaseApk.absolutePath,
                project.hasProperty('RELEASE_KEY_ALIAS') ? RELEASE_KEY_ALIAS : 'key'
        }
        
        // Align APK
        exec {
            commandLine 'zipalign',
                '-v', '4',
                releaseApk.absolutePath,
                signedApk.absolutePath
        }
        
        // Generate checksums
        def checksumFile = new File(distributionDir, 'checksums.txt')
        checksumFile.text = """
APK Checksums:
MD5: ${signedApk.bytes.encodeHex()}
Size: ${signedApk.length()} bytes
Build Date: ${new Date()}
Version: ${android.defaultConfig.versionName} (${android.defaultConfig.versionCode})
"""
        
        // Copy to distribution directory
        def finalApk = new File(distributionDir, "MyApp-${android.defaultConfig.versionName}.apk")
        finalApk.bytes = signedApk.bytes
        
        println "✅ APK signed and ready for distribution:"
        println "   Location: ${finalApk.absolutePath}"
        println "   Size: ${(finalApk.length() / 1024 / 1024).round(2)} MB"
    }
}
```

#### Advanced Task Techniques

**Task Dependencies and Ordering:**
```gradle
task prepareAssets {
    doLast {
        println "Preparing assets..."
    }
}

task compileCustomCode {
    dependsOn prepareAssets
    
    doLast {
        println "Compiling custom code..."
    }
}

task packageApp {
    dependsOn compileCustomCode
    mustRunAfter 'lint'  // Ensure lint runs before packaging
    
    doLast {
        println "Packaging application..."
    }
}

// Conditional task execution
task uploadToTestFlight {
    onlyIf {
        project.hasProperty('uploadEnabled') && uploadEnabled.toBoolean()
    }
    
    doLast {
        println "Uploading to TestFlight..."
    }
}
```

**Task Input/Output Optimization:**
```gradle
task processImages {
    def inputDir = file('src/main/assets/images')
    def outputDir = file("$buildDir/processed-images")
    
    inputs.dir(inputDir)
    outputs.dir(outputDir)
    
    // Skip if inputs haven't changed
    outputs.upToDateWhen {
        outputDir.exists() && outputDir.lastModified() > inputDir.lastModified()
    }
    
    doLast {
        outputDir.mkdirs()
        
        fileTree(inputDir).each { imageFile ->
            def outputFile = new File(outputDir, imageFile.name)
            // Process image...
            outputFile.bytes = imageFile.bytes
        }
    }
}
```

**Parallel Task Execution:**
```gradle
task processImagesParallel {
    def inputDir = file('src/main/assets/images')
    def outputDir = file("$buildDir/processed-images")
    
    inputs.dir(inputDir)
    outputs.dir(outputDir)
    
    doLast {
        outputDir.mkdirs()
        
        def images = fileTree(inputDir).files
        def pool = java.util.concurrent.Executors.newFixedThreadPool(4)
        
        try {
            def futures = images.collect { imageFile ->
                pool.submit {
                    def outputFile = new File(outputDir, imageFile.name)
                    // Process image in parallel
                    outputFile.bytes = imageFile.bytes
                    println "Processed: ${imageFile.name}"
                }
            }
            
            futures.each { it.get() } // Wait for all to complete
        } finally {
            pool.shutdown()
        }
    }
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

#### Real-World Testing Configuration Examples

**Complete E-Commerce App Testing Setup:**
```gradle
android {
    testOptions {
        unitTests {
            includeAndroidResources = true
            returnDefaultValues = true
            
            all {
                // JVM arguments for better performance
                jvmArgs '-noverify', '-XX:+UseG1GC'
                
                // Robolectric configuration
                systemProperty 'robolectric.enabledSdks', '28,29,30,31,32,33,34'
                systemProperty 'robolectric.offline', 'true'
                
                // Test logging configuration
                testLogging {
                    events "passed", "skipped", "failed", "standardOut", "standardError"
                    exceptionFormat "full"
                    showExceptions true
                    showCauses true
                    showStackTraces true
                }
                
                // Parallel execution for faster tests
                maxParallelForks = Runtime.runtime.availableProcessors().intdiv(2) ?: 1
                forkEvery = 100
                
                // Memory settings
                minHeapSize = "256m"
                maxHeapSize = "2g"
                
                // Timeout settings
                timeout = Duration.ofMinutes(10)
            }
        }
        
        // Instrumented test configuration
        animationsDisabled = true
        execution 'ANDROIDX_TEST_ORCHESTRATOR'
        
        managedDevices {
            devices {
                pixel2Api30(com.android.build.api.dsl.ManagedVirtualDevice) {
                    device = "Pixel 2"
                    apiLevel = 30
                    systemImageSource = "aosp"
                }
                
                pixel4Api33(com.android.build.api.dsl.ManagedVirtualDevice) {
                    device = "Pixel 4"
                    apiLevel = 33
                    systemImageSource = "google"
                }
            }
        }
    }
}

dependencies {
    // Unit Testing Framework
    testImplementation 'junit:junit:4.13.2'
    testImplementation 'org.junit.jupiter:junit-jupiter:5.10.1'
    testImplementation 'org.junit.vintage:junit-vintage-engine:5.10.1'
    
    // Kotlin Testing
    testImplementation 'org.jetbrains.kotlin:kotlin-test:1.9.10'
    testImplementation 'org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3'
    testImplementation 'app.cash.turbine:turbine:1.0.0'
    
    // Mocking Frameworks
    testImplementation 'org.mockito:mockito-core:5.6.0'
    testImplementation 'org.mockito:mockito-inline:5.6.0'
    testImplementation 'org.mockito.kotlin:mockito-kotlin:5.1.0'
    testImplementation 'io.mockk:mockk:1.13.8'
    
    // Android Testing Utilities
    testImplementation 'androidx.test:core:1.5.0'
    testImplementation 'androidx.test.ext:junit:1.1.5'
    testImplementation 'androidx.arch.core:core-testing:2.2.0'
    testImplementation 'androidx.room:room-testing:2.6.0'
    testImplementation 'androidx.work:work-testing:2.9.0'
    testImplementation 'androidx.paging:paging-common-ktx:3.2.1'
    
    // Robolectric for Android Unit Tests
    testImplementation 'org.robolectric:robolectric:4.11.1'
    
    // Network Testing
    testImplementation 'com.squareup.okhttp3:mockwebserver:4.12.0'
    testImplementation 'com.github.tomakehurst:wiremock:2.27.2'
    
    // Database Testing
    testImplementation 'androidx.room:room-testing:2.6.0'
    testImplementation 'com.google.truth:truth:1.1.5'
    
    // JSON Testing
    testImplementation 'org.json:json:20231013'
    testImplementation 'com.google.code.gson:gson:2.10.1'
    
    // Instrumented Testing
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation 'androidx.test.espresso:espresso-contrib:3.5.1'
    androidTestImplementation 'androidx.test.espresso:espresso-intents:3.5.1'
    androidTestImplementation 'androidx.test.espresso:espresso-accessibility:3.5.1'
    androidTestImplementation 'androidx.test.espresso:espresso-web:3.5.1'
    androidTestImplementation 'androidx.test.espresso:espresso-idling-resource:3.5.1'
    
    // UI Testing
    androidTestImplementation 'androidx.test.uiautomator:uiautomator:2.2.0'
    androidTestImplementation 'androidx.test:runner:1.5.2'
    androidTestImplementation 'androidx.test:rules:1.5.0'
    androidTestImplementation 'androidx.test.espresso:espresso-remote:3.5.1'
    
    // Fragment Testing
    debugImplementation 'androidx.fragment:fragment-testing:1.6.2'
    
    // Navigation Testing
    androidTestImplementation 'androidx.navigation:navigation-testing:2.7.5'
    
    // Hilt Testing
    testImplementation 'com.google.dagger:hilt-android-testing:2.48'
    kaptTest 'com.google.dagger:hilt-compiler:2.48'
    androidTestImplementation 'com.google.dagger:hilt-android-testing:2.48'
    kaptAndroidTest 'com.google.dagger:hilt-compiler:2.48'
    
    // Test Orchestrator
    androidTestUtil 'androidx.test:orchestrator:1.4.2'
    
    // Screenshot Testing
    androidTestImplementation 'com.github.pedrovgs:shot:5.14.1'
    
    // Performance Testing
    androidTestImplementation 'androidx.benchmark:benchmark-junit4:1.2.0'
}
```

**Advanced Custom Test Tasks:**
```gradle
// Comprehensive test suite
task runAllTests {
    group = 'verification'
    description = 'Run all tests (unit, integration, and instrumented)'
    
    dependsOn 'testDebugUnitTest'
    dependsOn 'connectedDebugAndroidTest'
    dependsOn 'lintDebug'
    
    doLast {
        println "✅ All tests completed successfully!"
    }
}

// Unit tests with coverage
task unitTestsWithCoverage(type: Test) {
    group = 'verification'
    description = 'Run unit tests with code coverage'
    
    useJUnitPlatform()
    
    testClassesDirs = sourceSets.test.output.classesDirs
    classpath = sourceSets.test.runtimeClasspath
    
    systemProperty 'junit.jupiter.execution.parallel.enabled', 'true'
    systemProperty 'junit.jupiter.execution.parallel.mode.default', 'concurrent'
    
    finalizedBy jacocoTestReport
    
    doFirst {
        println "Running unit tests with coverage..."
    }
    
    doLast {
        println "Unit tests completed. Coverage report available at: build/reports/jacoco/test/html/index.html"
    }
}

// Fast unit tests (excluding slow tests)
task quickUnitTests(type: Test) {
    group = 'verification'
    description = 'Run fast unit tests only (excludes integration and slow tests)'
    
    useJUnitPlatform {
        excludeTags 'slow', 'integration', 'database'
    }
    
    testLogging {
        events "failed"
        exceptionFormat "short"
        showStandardStreams = false
    }
    
    maxParallelForks = Runtime.runtime.availableProcessors()
    
    doLast {
        println "Quick unit tests completed in ${(System.currentTimeMillis() - startTime) / 1000}s"
    }
}

// Integration tests only
task integrationTests(type: Test) {
    group = 'verification'
    description = 'Run integration tests only'
    
    useJUnitPlatform {
        includeTags 'integration'
    }
    
    testLogging {
        events "passed", "failed", "skipped"
        exceptionFormat "full"
    }
    
    // Integration tests might need more memory
    minHeapSize = "512m"
    maxHeapSize = "4g"
}

// Database tests
task databaseTests(type: Test) {
    group = 'verification'
    description = 'Run database-related tests'
    
    useJUnitPlatform {
        includeTags 'database'
    }
    
    // Database tests run sequentially to avoid conflicts
    maxParallelForks = 1
    
    systemProperty 'room.schemaLocation', "$projectDir/schemas"
}

// Network tests
task networkTests(type: Test) {
    group = 'verification'
    description = 'Run network-related tests'
    
    useJUnitPlatform {
        includeTags 'network'
    }
    
    // Network tests might be flaky, allow retries
    retry {
        maxRetries = 3
        maxFailures = 5
    }
}

// Screenshot tests
task screenshotTests {
    group = 'verification'
    description = 'Run screenshot comparison tests'
    
    dependsOn 'connectedDebugAndroidTest'
    
    doLast {
        exec {
            commandLine './gradlew', 'executeScreenshotTests'
        }
    }
}

// Performance tests
task performanceTests {
    group = 'verification'
    description = 'Run performance benchmark tests'
    
    dependsOn 'connectedBenchmarkAndroidTest'
    
    doLast {
        println "Performance test results available at: build/reports/benchmark/"
    }
}

// Test report aggregation
task aggregateTestReports {
    group = 'reporting'
    description = 'Aggregate all test reports into a single report'
    
    dependsOn 'testDebugUnitTest', 'connectedDebugAndroidTest'
    
    doLast {
        def reportDir = file("$buildDir/reports/all-tests")
        reportDir.mkdirs()
        
        // Copy unit test reports
        copy {
            from "$buildDir/reports/tests/testDebugUnitTest"
            into "$reportDir/unit-tests"
        }
        
        // Copy instrumented test reports
        copy {
            from "$buildDir/reports/androidTests/connected"
            into "$reportDir/instrumented-tests"
        }
        
        // Generate summary report
        def summaryFile = new File(reportDir, 'test-summary.html')
        summaryFile.text = """
<!DOCTYPE html>
<html>
<head>
    <title>Test Summary Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; }
        .success { background-color: #d4edda; }
        .failure { background-color: #f8d7da; }
    </style>
</head>
<body>
    <h1>Test Summary Report</h1>
    <p>Generated: ${new Date()}</p>
    
    <div class="section">
        <h2>Test Reports</h2>
        <ul>
            <li><a href="unit-tests/index.html">Unit Test Report</a></li>
            <li><a href="instrumented-tests/index.html">Instrumented Test Report</a></li>
        </ul>
    </div>
</body>
</html>
"""
        
        println "Aggregated test report available at: ${summaryFile.absolutePath}"
    }
}
```

**JaCoCo Code Coverage Configuration:**
```gradle
apply plugin: 'jacoco'

jacoco {
    toolVersion = '0.8.10'
}

task jacocoTestReport(type: JacocoReport, dependsOn: ['testDebugUnitTest']) {
    group = 'reporting'
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
        '**/*Hilt*.*',
        '**/hilt_aggregated_deps/*',
        '**/*_HiltModules.class',
        '**/*_Provide*Factory*.*'
    ]
    
    def debugTree = fileTree(dir: "$project.buildDir/intermediates/javac/debug/classes", excludes: fileFilter)
    def kotlinDebugTree = fileTree(dir: "$project.buildDir/tmp/kotlin-classes/debug", excludes: fileFilter)
    
    classDirectories.setFrom(files([debugTree, kotlinDebugTree]))
    
    def sourceDirs = [
        "$project.projectDir/src/main/java",
        "$project.projectDir/src/main/kotlin",
        "$project.projectDir/src/debug/java",
        "$project.projectDir/src/debug/kotlin"
    ]
    
    sourceDirectories.setFrom(files(sourceDirs))
    executionData.setFrom(fileTree(dir: project.buildDir, includes: [
        'jacoco/testDebugUnitTest.exec',
        'outputs/unit_test_code_coverage/debugUnitTest/testDebugUnitTest.exec'
    ]))
    
    doLast {
        println "Code coverage report generated:"
        println "  HTML: ${reports.html.outputLocation.get()}/index.html"
        println "  XML: ${reports.xml.outputLocation.get()}"
    }
}

// Coverage verification
task jacocoTestCoverageVerification(type: JacocoCoverageVerification, dependsOn: 'jacocoTestReport') {
    violationRules {
        rule {
            limit {
                minimum = 0.80 // 80% coverage required
            }
        }
        
        rule {
            enabled = true
            element = 'CLASS'
            includes = ['com.example.ecommerce.domain.*']
            
            limit {
                counter = 'LINE'
                value = 'COVEREDRATIO'
                minimum = 0.90 // Domain layer requires 90% coverage
            }
        }
    }
}
```

**Test Environment Configuration:**
```gradle
android {
    testOptions {
        unitTests {
            all {
                // Environment variables for tests
                environment 'TEST_ENV', 'true'
                environment 'API_BASE_URL', 'http://localhost:8080'
                environment 'DATABASE_URL', 'jdbc:h2:mem:testdb'
                
                // System properties
                systemProperty 'test.database.reset', 'true'
                systemProperty 'test.network.mock', 'true'
                systemProperty 'robolectric.logging.enabled', 'true'
                
                // Test data directory
                systemProperty 'test.data.dir', "$projectDir/src/test/resources/testdata"
            }
        }
    }
}

// Test data setup task
task setupTestData {
    group = 'verification'
    description = 'Set up test data and mock servers'
    
    doLast {
        def testDataDir = file("$projectDir/src/test/resources/testdata")
        testDataDir.mkdirs()
        
        // Generate test JSON data
        def testProducts = [
            [id: 1, name: "Test Product 1", price: 19.99],
            [id: 2, name: "Test Product 2", price: 29.99],
            [id: 3, name: "Test Product 3", price: 39.99]
        ]
        
        def productsFile = new File(testDataDir, 'products.json')
        productsFile.text = new groovy.json.JsonBuilder(testProducts).toPrettyString()
        
        println "Test data generated at: ${testDataDir.absolutePath}"
    }
}

// Make tests depend on test data setup
tasks.withType(Test) {
    dependsOn setupTestData
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

Creating custom Gradle plugins allows you to encapsulate and reuse build logic across projects. This is essential for large organizations or complex build requirements.

#### Plugin Development Approaches

**1. Script Plugins (Simple)**
```gradle
// buildSrc/src/main/groovy/common-android.gradle
android {
    compileSdk 34
    
    defaultConfig {
        minSdk 24
        targetSdk 34
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

// Apply in build.gradle
apply from: 'common-android.gradle'
```

**2. Binary Plugins (Advanced)**
```kotlin
// buildSrc/src/main/kotlin/AndroidCommonPlugin.kt
import org.gradle.api.Plugin
import org.gradle.api.Project
import com.android.build.gradle.AppExtension

class AndroidCommonPlugin : Plugin<Project> {
    override fun apply(project: Project) {
        project.plugins.apply("com.android.application")
        
        val android = project.extensions.getByType(AppExtension::class.java)
        android.apply {
            compileSdkVersion(34)
            
            defaultConfig {
                minSdk = 24
                targetSdk = 34
                testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
            }
            
            compileOptions {
                sourceCompatibility = JavaVersion.VERSION_1_8
                targetCompatibility = JavaVersion.VERSION_1_8
            }
        }
    }
}
```

**3. Standalone Plugins (Enterprise)**
```kotlin
// plugin/src/main/kotlin/com/company/AndroidStandardsPlugin.kt
class AndroidStandardsPlugin : Plugin<Project> {
    override fun apply(project: Project) {
        project.extensions.create("androidStandards", AndroidStandardsExtension::class.java)
        
        project.afterEvaluate {
            configureAndroid()
            configureDependencies()
            configureQualityTools()
        }
    }
    
    private fun configureQualityTools() {
        // Add lint, detekt, ktlint configurations
    }
}
```

### Advanced Scripting Techniques

Advanced Gradle scripting enables sophisticated build automation and customization.

#### Dynamic Configuration
```gradle
// Dynamic version management
def getVersionName() {
    def stdout = new ByteArrayOutputStream()
    exec {
        commandLine 'git', 'describe', '--tags', '--always'
        standardOutput = stdout
    }
    return stdout.toString().trim()
}

android {
    defaultConfig {
        versionName getVersionName()
        versionCode getVersionCode()
    }
}

def getVersionCode() {
    def stdout = new ByteArrayOutputStream()
    exec {
        commandLine 'git', 'rev-list', '--count', 'HEAD'
        standardOutput = stdout
    }
    return Integer.parseInt(stdout.toString().trim())
}
```

#### Conditional Build Logic
```gradle
// Environment-based configuration
def isCI = System.getenv("CI") == "true"
def isDevelopment = project.hasProperty("development")

android {
    buildTypes {
        debug {
            if (isDevelopment) {
                applicationIdSuffix ".dev"
                versionNameSuffix "-DEV"
            }
        }
        
        release {
            if (isCI) {
                // CI-specific optimizations
                minifyEnabled true
                shrinkResources true
            }
        }
    }
}

// Conditional dependencies
dependencies {
    if (isDevelopment) {
        implementation 'com.squareup.leakcanary:leakcanary-android:2.12'
    }
    
    if (isCI) {
        implementation 'com.github.stephanenicolas.robospice:robospice:1.4.14'
    }
}
```

### Build Logic Organization

Organizing build logic effectively is crucial for maintainable and scalable projects.

#### BuildSrc Organization
```
buildSrc/
├── build.gradle.kts
└── src/main/kotlin/
    ├── Dependencies.kt
    ├── Versions.kt
    ├── BuildConfig.kt
    └── plugins/
        ├── AndroidCommonPlugin.kt
        └── QualityPlugin.kt
```

```kotlin
// buildSrc/src/main/kotlin/Dependencies.kt
object Dependencies {
    object AndroidX {
        const val core = "androidx.core:core-ktx:${Versions.androidxCore}"
        const val appcompat = "androidx.appcompat:appcompat:${Versions.androidxAppcompat}"
        const val material = "com.google.android.material:material:${Versions.material}"
    }
    
    object Network {
        const val retrofit = "com.squareup.retrofit2:retrofit:${Versions.retrofit}"
        const val okhttp = "com.squareup.okhttp3:okhttp:${Versions.okhttp}"
    }
    
    object Testing {
        const val junit = "junit:junit:${Versions.junit}"
        const val mockito = "org.mockito:mockito-core:${Versions.mockito}"
    }
}
```

#### Convention Plugins
```kotlin
// buildSrc/src/main/kotlin/android-common.gradle.kts
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    compileSdk = BuildConfig.compileSdk
    
    defaultConfig {
        minSdk = BuildConfig.minSdk
        targetSdk = BuildConfig.targetSdk
    }
    
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation(Dependencies.AndroidX.core)
    implementation(Dependencies.AndroidX.appcompat)
    implementation(Dependencies.AndroidX.material)
}
```

### Composite Builds

Composite builds allow you to include other Gradle builds as dependencies, enabling modular development across repositories.

#### Setting Up Composite Builds
```gradle
// settings.gradle
rootProject.name = 'main-app'

// Include local modules
include ':app'
include ':core'
include ':feature-login'

// Include external builds
includeBuild '../shared-library'
includeBuild '../common-utils'
```

#### Cross-Build Dependencies
```gradle
// app/build.gradle
dependencies {
    implementation 'com.company:shared-library:1.0'  // From composite build
    implementation project(':core')                   // From same build
}
```

#### Build Coordination
```gradle
// Coordinate builds with custom tasks
task buildAll {
    dependsOn gradle.includedBuilds*.task(':build')
}

task testAll {
    dependsOn gradle.includedBuilds*.task(':test')
}
```

### Gradle Properties and Configuration

Gradle properties provide a powerful way to configure builds and pass information between different parts of the build system.

#### Property Sources (Priority Order)
1. Command line: `-Pproperty=value`
2. `gradle.properties` in project root
3. `gradle.properties` in Gradle user home
4. Environment variables: `ORG_GRADLE_PROJECT_property`
5. System properties: `-Dproperty=value`

#### Common Configuration Patterns
```properties
# gradle.properties
# Build optimization
org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=512m
org.gradle.parallel=true
org.gradle.caching=true
org.gradle.configureondemand=true

# Android-specific
android.useAndroidX=true
android.enableJetifier=true
android.enableR8.fullMode=true

# Custom properties
app.versionMajor=1
app.versionMinor=0
app.versionPatch=0

# Environment-specific
api.baseUrl=https://api.example.com
api.timeout=30
debug.enableLogging=true
```

#### Using Properties in Build Scripts
```gradle
// Reading properties with defaults
def apiBaseUrl = project.findProperty('api.baseUrl') ?: 'https://localhost:8080'
def enableLogging = project.findProperty('debug.enableLogging')?.toBoolean() ?: false

android {
    defaultConfig {
        buildConfigField "String", "API_BASE_URL", "\"${apiBaseUrl}\""
        buildConfigField "boolean", "ENABLE_LOGGING", "${enableLogging}"
    }
}

// Version management from properties
def versionMajor = project.findProperty('app.versionMajor')?.toInteger() ?: 1
def versionMinor = project.findProperty('app.versionMinor')?.toInteger() ?: 0
def versionPatch = project.findProperty('app.versionPatch')?.toInteger() ?: 0

android {
    defaultConfig {
        versionCode versionMajor * 10000 + versionMinor * 100 + versionPatch
        versionName "${versionMajor}.${versionMinor}.${versionPatch}"
    }
}
```

---

## 6. Expert-Level Techniques

This section covers advanced Gradle techniques for expert Android developers who need to implement complex build systems, optimize performance at scale, and integrate sophisticated CI/CD pipelines.

### Performance Optimization Strategies

Expert-level performance optimization goes beyond basic caching and requires deep understanding of Gradle internals, build profiling, and systematic optimization approaches.

#### Build Performance Profiling and Analysis

**Using Gradle Build Scans:**

```gradle
// build.gradle (project level)
plugins {
    id 'com.gradle.build-scan' version '3.16.1'
}

buildScan {
    termsOfServiceUrl = 'https://gradle.com/terms-of-service'
    termsOfServiceAgree = 'yes'
    
    // Automatically publish build scans for CI builds
    publishAlways()
    
    // Add custom tags and values
    tag 'CI'
    value 'Git Commit', getGitCommitId()
    
    // Capture build environment information
    buildFinished {
        if (it.failure) {
            tag 'FAILED'
        }
    }
}

def getGitCommitId() {
    try {
        return 'git rev-parse --short HEAD'.execute().text.trim()
    } catch (Exception e) {
        return 'unknown'
    }
}
```

**Advanced Build Profiling:**

```gradle
// gradle.properties
org.gradle.profile=true
org.gradle.debug=true

# Enable detailed logging
org.gradle.logging.level=info

# Profile specific tasks
org.gradle.profile.format=html
```

```bash
# Generate detailed build reports
./gradlew assembleDebug --profile --build-cache --parallel

# Analyze task execution times
./gradlew assembleDebug --dry-run --profile

# Memory profiling
./gradlew assembleDebug -Dorg.gradle.jvmargs="-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/gradle-heap-dump.hprof"
```

#### Advanced Build Optimization Techniques

**Incremental Compilation Optimization:**

```gradle
// Optimize Kotlin compilation
android {
    kotlinOptions {
        jvmTarget = '1.8'
        
        // Enable incremental compilation
        incremental = true
        
        // Optimize for build speed
        freeCompilerArgs += [
            '-Xuse-ir',
            '-Xbackend-threads=4',
            '-Xuse-k2' // Enable K2 compiler for faster builds
        ]
    }
    
    // Optimize Java compilation
    compileOptions {
        incremental = true
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}

// Advanced annotation processing optimization
kapt {
    correctErrorTypes = true
    useBuildCache = true
    
    // Parallel annotation processing
    arguments {
        arg("dagger.hilt.shareTestComponents", "true")
        arg("dagger.formatGeneratedSource", "disabled")
        arg("dagger.gradle.incremental", "enabled")
    }
    
    // Optimize for incremental builds
    includeCompileClasspath = false
}
```

**Resource Processing Optimization:**

```gradle
android {
    // Optimize resource processing
    aaptOptions {
        cruncherEnabled = false // Disable PNG crunching for debug builds
        cruncherProcesses = 0
    }
    
    // Optimize for development builds
    buildTypes {
        debug {
            // Disable resource shrinking for faster builds
            shrinkResources = false
            minifyEnabled = false
            
            // Optimize dex processing
            multiDexEnabled = true
            multiDexKeepProguard file('multidex-config.pro')
        }
    }
    
    // Advanced packaging options
    packagingOptions {
        // Exclude unnecessary files
        excludes += [
            'META-INF/DEPENDENCIES',
            'META-INF/LICENSE',
            'META-INF/LICENSE.txt',
            'META-INF/NOTICE',
            'META-INF/NOTICE.txt',
            'META-INF/*.kotlin_module'
        ]
        
        // Merge duplicate files
        merges += [
            'META-INF/services/**'
        ]
        
        // Pick first occurrence of duplicate files
        pickFirsts += [
            '**/libc++_shared.so',
            '**/libjsc.so'
        ]
    }
}
```

#### Memory and Resource Optimization

**JVM Memory Tuning:**

```properties
# gradle.properties - Advanced JVM tuning
org.gradle.jvmargs=-Xmx8g -Xms2g -XX:MaxMetaspaceSize=1g -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:+UseStringDeduplication

# Gradle daemon optimization
org.gradle.daemon=true
org.gradle.daemon.idletimeout=7200000

# File system watching
org.gradle.vfs.watch=true
org.gradle.vfs.verbose=true

# Configuration cache (Gradle 6.6+)
org.gradle.unsafe.configuration-cache=true
org.gradle.unsafe.configuration-cache-problems=warn
```

**Advanced Parallel Execution:**

```gradle
// build.gradle (project level)
gradle.projectsEvaluated {
    tasks.withType(JavaCompile) {
        options.fork = true
        options.forkOptions.jvmArgs = ['-Xmx2g']
        options.forkOptions.memoryMaximumSize = '2g'
    }
    
    tasks.withType(org.jetbrains.kotlin.gradle.tasks.KotlinCompile) {
        kotlinOptions {
            // Use multiple threads for Kotlin compilation
            freeCompilerArgs += ['-Xbackend-threads=4']
        }
    }
}

// Optimize test execution
android {
    testOptions {
        unitTests {
            // Parallel test execution
            all {
                maxParallelForks = Runtime.runtime.availableProcessors().intdiv(2) ?: 1
                forkEvery = 100
                
                // Memory optimization for tests
                minHeapSize = "128m"
                maxHeapSize = "2g"
                
                // JVM arguments for test execution
                jvmArgs '-XX:MaxPermSize=256m', '-XX:+UseG1GC'
            }
        }
    }
}
```

### Custom Build Logic Implementation

Expert-level custom build logic involves creating reusable, maintainable build components that can be shared across projects and teams.

#### Advanced Custom Plugin Development

**Creating a Composite Build Plugin:**

```kotlin
// buildSrc/src/main/kotlin/AndroidLibraryPlugin.kt
import com.android.build.gradle.LibraryExtension
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.kotlin.dsl.configure

class AndroidLibraryPlugin : Plugin<Project> {
    override fun apply(project: Project) {
        project.pluginManager.apply("com.android.library")
        project.pluginManager.apply("kotlin-android")
        project.pluginManager.apply("kotlin-kapt")
        
        project.configure<LibraryExtension> {
            compileSdk = BuildConfig.COMPILE_SDK
            
            defaultConfig {
                minSdk = BuildConfig.MIN_SDK
                targetSdk = BuildConfig.TARGET_SDK
                
                testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
                consumerProguardFiles("consumer-rules.pro")
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
                sourceCompatibility = BuildConfig.JAVA_VERSION
                targetCompatibility = BuildConfig.JAVA_VERSION
            }
            
            kotlinOptions {
                jvmTarget = BuildConfig.JVM_TARGET
            }
        }
        
        // Apply common dependencies
        project.dependencies.apply {
            add("implementation", Dependencies.KOTLIN_STDLIB)
            add("implementation", Dependencies.ANDROIDX_CORE_KTX)
            add("testImplementation", Dependencies.JUNIT)
            add("androidTestImplementation", Dependencies.ANDROIDX_TEST_EXT_JUNIT)
        }
        
        // Configure custom tasks
        configureCustomTasks(project)
    }
    
    private fun configureCustomTasks(project: Project) {
        project.tasks.register("generateModuleInfo") {
            group = "build"
            description = "Generates module information file"
            
            doLast {
                val moduleInfoFile = project.file("${project.buildDir}/generated/module-info.txt")
                moduleInfoFile.parentFile.mkdirs()
                moduleInfoFile.writeText("""
                    Module: ${project.name}
                    Version: ${project.version}
                    Build Time: ${java.time.Instant.now()}
                    Dependencies: ${project.configurations.getByName("implementation").dependencies.map { "${it.group}:${it.name}:${it.version}" }}
                """.trimIndent())
            }
        }
    }
}
```

**Build Configuration DSL:**

```kotlin
// buildSrc/src/main/kotlin/BuildConfig.kt
object BuildConfig {
    const val COMPILE_SDK = 34
    const val MIN_SDK = 24
    const val TARGET_SDK = 34
    const val JVM_TARGET = "1.8"
    val JAVA_VERSION = org.gradle.api.JavaVersion.VERSION_1_8
    
    const val VERSION_NAME = "1.0.0"
    const val VERSION_CODE = 1
}

object Dependencies {
    const val KOTLIN_VERSION = "1.9.10"
    const val ANDROID_GRADLE_PLUGIN = "8.1.2"
    
    const val KOTLIN_STDLIB = "org.jetbrains.kotlin:kotlin-stdlib:$KOTLIN_VERSION"
    const val ANDROIDX_CORE_KTX = "androidx.core:core-ktx:1.12.0"
    const val ANDROIDX_APPCOMPAT = "androidx.appcompat:appcompat:1.6.1"
    
    // Test dependencies
    const val JUNIT = "junit:junit:4.13.2"
    const val ANDROIDX_TEST_EXT_JUNIT = "androidx.test.ext:junit:1.1.5"
    const val ESPRESSO_CORE = "androidx.test.espresso:espresso-core:3.5.1"
    
    // Networking
    const val RETROFIT = "com.squareup.retrofit2:retrofit:2.9.0"
    const val OKHTTP = "com.squareup.okhttp3:okhttp:4.12.0"
    
    // Dependency Injection
    const val HILT_ANDROID = "com.google.dagger:hilt-android:2.48"
    const val HILT_COMPILER = "com.google.dagger:hilt-compiler:2.48"
}
```

#### Advanced Build Script Organization

**Convention Plugins Pattern:**

```kotlin
// buildSrc/src/main/kotlin/convention/android-library-convention.gradle.kts
plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
    id("kotlin-kapt")
}

android {
    compileSdk = BuildConfig.COMPILE_SDK
    
    defaultConfig {
        minSdk = BuildConfig.MIN_SDK
        targetSdk = BuildConfig.TARGET_SDK
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
}

dependencies {
    implementation(Dependencies.KOTLIN_STDLIB)
    implementation(Dependencies.ANDROIDX_CORE_KTX)
    
    testImplementation(Dependencies.JUNIT)
    androidTestImplementation(Dependencies.ANDROIDX_TEST_EXT_JUNIT)
}
```

**Shared Build Logic:**

```kotlin
// buildSrc/src/main/kotlin/BuildLogic.kt
object BuildLogic {
    fun Project.configureAndroidCommon() {
        extensions.configure<com.android.build.gradle.BaseExtension> {
            compileSdkVersion(BuildConfig.COMPILE_SDK)
            
            defaultConfig {
                minSdk = BuildConfig.MIN_SDK
                targetSdk = BuildConfig.TARGET_SDK
                versionCode = BuildConfig.VERSION_CODE
                versionName = BuildConfig.VERSION_NAME
            }
            
            compileOptions {
                sourceCompatibility = BuildConfig.JAVA_VERSION
                targetCompatibility = BuildConfig.JAVA_VERSION
            }
        }
    }
    
    fun Project.configureKotlin() {
        tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile>().configureEach {
            kotlinOptions {
                jvmTarget = BuildConfig.JVM_TARGET
                freeCompilerArgs = freeCompilerArgs + listOf(
                    "-opt-in=kotlin.RequiresOptIn",
                    "-Xuse-ir"
                )
            }
        }
    }
    
    fun Project.configureTesting() {
        tasks.withType<Test>().configureEach {
            useJUnitPlatform()
            testLogging {
                events("passed", "skipped", "failed")
                showStandardStreams = true
            }
        }
    }
}
```

#### Dynamic Build Configuration

**Environment-Based Configuration:**

```gradle
// Dynamic configuration based on environment
def isCI = System.getenv("CI") == "true"
def isDevelopment = !isCI && project.hasProperty("development")

android {
    buildTypes {
        debug {
            debuggable = true
            minifyEnabled = false
            
            // Different configurations for different environments
            if (isDevelopment) {
                applicationIdSuffix = ".dev"
                versionNameSuffix = "-dev"
                
                // Enable strict mode for development
                buildConfigField "boolean", "STRICT_MODE_ENABLED", "true"
            } else if (isCI) {
                // CI-specific optimizations
                testCoverageEnabled = true
                buildConfigField "boolean", "IS_CI_BUILD", "true"
            }
        }
        
        release {
            minifyEnabled = true
            shrinkResources = true
            
            // Different signing configs based on environment
            if (isCI) {
                signingConfig = signingConfigs.getByName("ci")
            } else {
                signingConfig = signingConfigs.getByName("release")
            }
        }
    }
    
    // Dynamic product flavors
    flavorDimensions "environment", "api"
    
    productFlavors {
        development {
            dimension "environment"
            applicationIdSuffix = ".dev"
            buildConfigField "String", "API_BASE_URL", "\"https://api-dev.example.com\""
        }
        
        staging {
            dimension "environment"
            applicationIdSuffix = ".staging"
            buildConfigField "String", "API_BASE_URL", "\"https://api-staging.example.com\""
        }
        
        production {
            dimension "environment"
            buildConfigField "String", "API_BASE_URL", "\"https://api.example.com\""
        }
        
        // API version flavors
        v1 {
            dimension "api"
            buildConfigField "String", "API_VERSION", "\"v1\""
        }
        
        v2 {
            dimension "api"
            buildConfigField "String", "API_VERSION", "\"v2\""
        }
    }
}
```

### CI/CD Integration and Automation

Expert-level CI/CD integration requires sophisticated build automation, artifact management, and deployment strategies.

#### Advanced GitHub Actions Integration

**Comprehensive Android CI Pipeline:**

```yaml
# .github/workflows/android-ci.yml
name: Android CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  release:
    types: [ published ]

env:
  GRADLE_OPTS: -Dorg.gradle.daemon=false -Dorg.gradle.workers.max=2 -Dorg.gradle.parallel=true
  GRADLE_USER_HOME: ${{ github.workspace }}/.gradle

jobs:
  test:
    name: Unit Tests
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      with:
        fetch-depth: 0
    
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
    
    - name: Cache Gradle dependencies
      uses: actions/cache@v3
      with:
        path: |
          ~/.gradle/caches
          ~/.gradle/wrapper
          .gradle/
        key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
        restore-keys: |
          ${{ runner.os }}-gradle-
    
    - name: Grant execute permission for gradlew
      run: chmod +x gradlew
    
    - name: Run unit tests
      run: ./gradlew testDebugUnitTest --continue --build-cache
    
    - name: Generate test report
      uses: dorny/test-reporter@v1
      if: success() || failure()
      with:
        name: Unit Test Results
        path: '**/build/test-results/testDebugUnitTest/TEST-*.xml'
        reporter: java-junit
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: test-results
        path: |
          **/build/test-results/
          **/build/reports/
  
  lint:
    name: Code Quality
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
    
    - name: Cache Gradle dependencies
      uses: actions/cache@v3
      with:
        path: |
          ~/.gradle/caches
          ~/.gradle/wrapper
        key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
    
    - name: Run lint
      run: ./gradlew lintDebug --build-cache
    
    - name: Upload lint results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: lint-results
        path: '**/build/reports/lint-results-*.html'
  
  build:
    name: Build APK
    runs-on: ubuntu-latest
    needs: [test, lint]
    
    strategy:
      matrix:
        variant: [debug, release]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
    
    - name: Cache Gradle dependencies
      uses: actions/cache@v3
      with:
        path: |
          ~/.gradle/caches
          ~/.gradle/wrapper
        key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
    
    - name: Decode keystore
      if: matrix.variant == 'release'
      env:
        ENCODED_STRING: ${{ secrets.KEYSTORE_BASE64 }}
      run: |
        echo $ENCODED_STRING | base64 -di > app/keystore.jks
    
    - name: Build APK
      env:
        KEYSTORE_PASSWORD: ${{ secrets.KEYSTORE_PASSWORD }}
        KEY_ALIAS: ${{ secrets.KEY_ALIAS }}
        KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}
      run: ./gradlew assemble${{ matrix.variant }} --build-cache
    
    - name: Upload APK
      uses: actions/upload-artifact@v3
      with:
        name: apk-${{ matrix.variant }}
        path: app/build/outputs/apk/${{ matrix.variant }}/*.apk
  
  deploy:
    name: Deploy to Play Store
    runs-on: ubuntu-latest
    needs: build
    if: github.event_name == 'release'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Download release APK
      uses: actions/download-artifact@v3
      with:
        name: apk-release
        path: app/build/outputs/apk/release/
    
    - name: Deploy to Play Store
      uses: r0adkll/upload-google-play@v1
      with:
        serviceAccountJsonPlainText: ${{ secrets.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON }}
        packageName: com.example.myapp
        releaseFiles: app/build/outputs/apk/release/*.apk
        track: production
        status: completed
```

#### Advanced Build Automation

**Automated Version Management:**

```gradle
// build.gradle (app module)
def getVersionCode() {
    def versionPropsFile = file('version.properties')
    def versionCode = 1
    
    if (versionPropsFile.exists()) {
        def Properties versionProps = new Properties()
        versionProps.load(new FileInputStream(versionPropsFile))
        versionCode = versionProps['VERSION_CODE'].toInteger()
    }
    
    return versionCode
}

def getVersionName() {
    def gitTag = 'git describe --tags --abbrev=0'.execute().text.trim()
    def gitCommitCount = 'git rev-list --count HEAD'.execute().text.trim()
    def gitCommitHash = 'git rev-parse --short HEAD'.execute().text.trim()
    
    if (gitTag.isEmpty()) {
        return "1.0.0-${gitCommitCount}-${gitCommitHash}"
    } else {
        return "${gitTag}-${gitCommitCount}-${gitCommitHash}"
    }
}

android {
    defaultConfig {
        versionCode getVersionCode()
        versionName getVersionName()
        
        // Add build information to BuildConfig
        buildConfigField "String", "GIT_COMMIT", "\"${getGitCommitHash()}\""
        buildConfigField "String", "BUILD_TIME", "\"${getBuildTime()}\""
        buildConfigField "boolean", "IS_CI_BUILD", "${System.getenv('CI') == 'true'}"
    }
}

def getGitCommitHash() {
    return 'git rev-parse --short HEAD'.execute().text.trim()
}

def getBuildTime() {
    return new Date().format("yyyy-MM-dd'T'HH:mm:ss'Z'", TimeZone.getTimeZone("UTC"))
}

// Increment version code for release builds
task incrementVersionCode {
    doLast {
        def versionPropsFile = file('version.properties')
        def versionCode = 1
        
        if (versionPropsFile.exists()) {
            def Properties versionProps = new Properties()
            versionProps.load(new FileInputStream(versionPropsFile))
            versionCode = versionProps['VERSION_CODE'].toInteger() + 1
        }
        
        def Properties versionProps = new Properties()
        versionProps['VERSION_CODE'] = versionCode.toString()
        versionProps.store(versionPropsFile.newWriter(), null)
        
        println "Version code incremented to: $versionCode"
    }
}

// Automatically increment version code for release builds
tasks.whenTaskAdded { task ->
    if (task.name == 'assembleRelease') {
        task.dependsOn incrementVersionCode
    }
}
```

**Automated Testing and Reporting:**

```gradle
// Advanced test configuration
android {
    testOptions {
        unitTests {
            includeAndroidResources = true
            returnDefaultValues = true
            
            all {
                // JaCoCo test coverage
                jacoco {
                    includeNoLocationClasses = true
                    excludes = ['jdk.internal.*']
                }
                
                // Test result reporting
                testLogging {
                    events "passed", "skipped", "failed", "standardOut", "standardError"
                    outputs.upToDateWhen { false }
                    showStandardStreams = true
                }
                
                // Fail fast on test failures
                failFast = true
                
                // Parallel test execution
                maxParallelForks = Runtime.runtime.availableProcessors().intdiv(2) ?: 1
            }
        }
        
        // Instrumented test configuration
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

// JaCoCo test coverage configuration
apply plugin: 'jacoco'

jacoco {
    toolVersion = "0.8.8"
}

tasks.register('jacocoTestReport', JacocoReport) {
    dependsOn 'testDebugUnitTest'
    
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
        '**/*Lambda*.class'
    ]
    
    def debugTree = fileTree(dir: "${buildDir}/intermediates/javac/debug", excludes: fileFilter)
    def kotlinDebugTree = fileTree(dir: "${buildDir}/tmp/kotlin-classes/debug", excludes: fileFilter)
    
    classDirectories.setFrom(files([debugTree, kotlinDebugTree]))
    sourceDirectories.setFrom(files(['src/main/java', 'src/main/kotlin']))
    executionData.setFrom(fileTree(dir: buildDir, includes: ['jacoco/testDebugUnitTest.exec']))
}
```

### Advanced Dependency Management

Expert-level dependency management involves sophisticated conflict resolution, custom dependency rules, and advanced repository management.

#### Dependency Conflict Resolution

**Advanced Dependency Resolution Strategies:**

```gradle
// build.gradle (module level)
configurations.all {
    resolutionStrategy {
        // Force specific versions to resolve conflicts
        force 'com.squareup.okhttp3:okhttp:4.12.0'
        force 'org.jetbrains.kotlin:kotlin-stdlib:1.9.10'
        
        // Fail on version conflict
        failOnVersionConflict()
        
        // Custom conflict resolution
        eachDependency { DependencyResolveDetails details ->
            if (details.requested.group == 'org.apache.httpcomponents') {
                details.useVersion '4.5.14'
                details.because 'Security vulnerability in older versions'
            }
            
            // Handle Kotlin stdlib conflicts
            if (details.requested.name == 'kotlin-stdlib-jdk8') {
                details.useTarget group: details.requested.group, name: 'kotlin-stdlib', version: details.requested.version
            }
        }
        
        // Cache dynamic versions for 24 hours
        cacheDynamicVersionsFor 24, 'hours'
        cacheChangingModulesFor 0, 'seconds'
    }
    
    // Exclude transitive dependencies globally
    exclude group: 'commons-logging', module: 'commons-logging'
    exclude group: 'org.apache.httpcomponents', module: 'httpclient'
}

// Dependency substitution rules
configurations.all {
    resolutionStrategy.dependencySubstitution {
        // Replace one dependency with another
        substitute module('org.apache.commons:commons-lang3') using module('org.apache.commons:commons-lang3:3.12.0')
        
        // Replace with project dependency
        substitute module('com.example:internal-lib') using project(':internal-lib')
        
        // Platform-specific substitutions
        if (project.hasProperty('useSnapshot')) {
            substitute module('com.example:my-lib') using module('com.example:my-lib:1.0-SNAPSHOT')
        }
    }
}
```

**Custom Dependency Configurations:**

```gradle
// Define custom configurations
configurations {
    // Custom configuration for integration test dependencies
    integrationTestImplementation.extendsFrom testImplementation
    integrationTestRuntimeOnly.extendsFrom testRuntimeOnly
    
    // Configuration for optional dependencies
    optional
    
    // Configuration for compile-time only dependencies
    compileOnlyApi
    
    // Configuration for annotation processors
    processor
}

dependencies {
    // Use custom configurations
    integrationTestImplementation 'org.testcontainers:testcontainers:1.19.1'
    integrationTestImplementation 'org.testcontainers:junit-jupiter:1.19.1'
    
    optional 'com.google.guava:guava:32.1.3-jre'
    
    processor 'com.google.auto.service:auto-service:1.1.1'
    compileOnlyApi 'com.google.auto.service:auto-service-annotations:1.1.1'
}

// Create source sets for custom configurations
sourceSets {
    integrationTest {
        java {
            compileClasspath += main.output + test.output
            runtimeClasspath += main.output + test.output
        }
    }
}

// Register integration test task
tasks.register('integrationTest', Test) {
    description = 'Runs integration tests.'
    group = 'verification'
    
    testClassesDirs = sourceSets.integrationTest.output.classesDirs
    classpath = sourceSets.integrationTest.runtimeClasspath
    
    shouldRunAfter test
}

check.dependsOn integrationTest
```

#### Advanced Repository Management

**Custom Repository Configuration:**

```gradle
// build.gradle (project level)
allprojects {
    repositories {
        // Define repository order (first match wins)
        google {
            content {
                // Only look for Android artifacts in Google repository
                includeGroupByRegex "com\\.android.*"
                includeGroupByRegex "com\\.google.*"
                includeGroupByRegex "androidx.*"
            }
        }
        
        mavenCentral {
            content {
                // Exclude Android artifacts from Maven Central
                excludeGroupByRegex "com\\.android.*"
                excludeGroupByRegex "androidx.*"
            }
        }
        
        // Custom corporate repository
        maven {
            name = "CorporateRepository"
            url = uri("https://nexus.company.com/repository/maven-public/")
            
            credentials {
                username = project.findProperty("nexusUsername") ?: System.getenv("NEXUS_USERNAME")
                password = project.findProperty("nexusPassword") ?: System.getenv("NEXUS_PASSWORD")
            }
            
            content {
                // Only look for company artifacts
                includeGroup "com.company"
                includeGroupByRegex "com\\.company\\..*"
            }
        }
        
        // Snapshot repository
        maven {
            name = "SnapshotRepository"
            url = uri("https://oss.sonatype.org/content/repositories/snapshots/")
            
            content {
                // Only allow snapshot versions
                includeVersionByRegex ".*", ".*", ".*-SNAPSHOT"
            }
        }
        
        // Local repository for development
        if (project.hasProperty("useLocalRepo")) {
            flatDir {
                dirs 'libs', '../shared-libs'
            }
        }
        
        // Gradle Plugin Portal (for plugins only)
        gradlePluginPortal {
            content {
                // Only look for Gradle plugins
                includeGroupByRegex ".*\\.gradle\\.plugin"
                includeGroup "com.gradle"
            }
        }
    }
}
```

### Build Caching Strategies

Expert-level build caching involves sophisticated local and remote caching strategies to maximize build performance across teams and CI/CD environments.

#### Advanced Local Build Cache

**Optimized Local Cache Configuration:**

```properties
# gradle.properties
org.gradle.caching=true
org.gradle.caching.debug=true

# Local cache directory (optional)
org.gradle.cache.dir=/path/to/custom/cache

# Build cache configuration
org.gradle.cache.cleanup=true
org.gradle.cache.cleanup.policy=CLEANUP_UNUSED_ENTRIES_AFTER_DAYS:7
```

```gradle
// build.gradle (project level)
buildCache {
    local {
        enabled = true
        directory = file("${rootDir}/.gradle/build-cache")
        removeUnusedEntriesAfterDays = 7
        
        // Push to local cache
        push = true
    }
}

// Configure tasks for caching
tasks.withType(JavaCompile) {
    // Enable caching for compilation tasks
    outputs.cacheIf { true }
    
    // Define cache key inputs
    inputs.property("java.version", System.getProperty("java.version"))
    inputs.property("java.vendor", System.getProperty("java.vendor"))
}

tasks.withType(org.jetbrains.kotlin.gradle.tasks.KotlinCompile) {
    outputs.cacheIf { true }
    
    inputs.property("kotlin.version", kotlin.coreLibrariesVersion)
    inputs.property("kotlin.incremental", kotlinOptions.incremental)
}
```

#### Remote Build Cache Implementation

**Enterprise Remote Cache Setup:**

```gradle
// build.gradle (project level)
buildCache {
    local {
        enabled = true
        push = !System.getenv("CI")
    }
    
    remote(HttpBuildCache) {
        url = 'https://build-cache.company.com/cache/'
        
        credentials {
            username = System.getenv("BUILD_CACHE_USERNAME")
            password = System.getenv("BUILD_CACHE_PASSWORD")
        }
        
        // Only push from CI
        push = System.getenv("CI") == "true"
        enabled = true
        
        // Configure authentication
        authentication {
            basic(BasicAuthentication)
        }
    }
}

// Custom cache configuration for different environments
if (System.getenv("CI") == "true") {
    buildCache {
        remote(HttpBuildCache) {
            url = 'https://ci-build-cache.company.com/cache/'
            push = true
            enabled = true
        }
    }
} else if (project.hasProperty("teamCache")) {
    buildCache {
        remote(HttpBuildCache) {
            url = 'https://team-build-cache.company.com/cache/'
            push = false  // Only pull for team members
            enabled = true
        }
    }
}
```

**Advanced Cache Key Customization:**

```gradle
// Custom cache key normalization
normalization {
    runtimeClasspath {
        // Ignore timestamps in JAR files
        ignore '**/META-INF/MANIFEST.MF'
        ignore '**/META-INF/*.SF'
        ignore '**/META-INF/*.DSA'
        ignore '**/META-INF/*.RSA'
    }
    
    // Normalize file paths
    runtimeClasspath {
        metaInf {
            ignoreAttribute("Implementation-Version")
            ignoreAttribute("Built-Date")
        }
    }
}

// Configure specific tasks for optimal caching
tasks.register('generateProguardConfig') {
    inputs.files(configurations.runtimeClasspath)
    inputs.property("minSdkVersion", android.defaultConfig.minSdkVersion.apiLevel)
    inputs.property("targetSdkVersion", android.defaultConfig.targetSdkVersion.apiLevel)
    
    outputs.file("${buildDir}/proguard/proguard-config.pro")
    outputs.cacheIf { true }
    
    doLast {
        // Generate ProGuard configuration
        def proguardFile = file("${buildDir}/proguard/proguard-config.pro")
        proguardFile.parentFile.mkdirs()
        proguardFile.text = generateProguardRules()
    }
}

def generateProguardRules() {
    return """
        # Generated ProGuard rules
        -keepattributes *Annotation*
        -keepclassmembers class * {
            @com.google.gson.annotations.SerializedName <fields>;
        }
        # Add more rules based on dependencies
    """.stripIndent()
}
```

#### Build Cache Monitoring and Analytics

**Cache Performance Monitoring:**

```gradle
// build.gradle (project level)
gradle.buildFinished { buildResult ->
    if (gradle.startParameter.isBuildCacheEnabled()) {
        def cacheStats = gradle.services.get(org.gradle.caching.internal.BuildCacheStatistics)
        
        println """
        Build Cache Statistics:
        - Cache hits: ${cacheStats.allCacheHits}
        - Cache misses: ${cacheStats.allCacheMisses}
        - Cache hit ratio: ${String.format("%.2f%%", cacheStats.allCacheHits * 100.0 / (cacheStats.allCacheHits + cacheStats.allCacheMisses))}
        - Local cache hits: ${cacheStats.localCacheHits}
        - Remote cache hits: ${cacheStats.remoteCacheHits}
        """.stripIndent()
    }
}

// Task-level cache monitoring
tasks.configureEach {
    doFirst {
        if (state.cacheHit) {
            logger.lifecycle("Task ${path} loaded from cache")
        }
    }
}
```

> **💡 Tip:** Monitor cache hit ratios regularly. A good cache hit ratio should be above 80% for established projects. Lower ratios may indicate cache key instability or insufficient cache retention.

> **⚠️ Warning:** Be cautious with remote build caches in security-sensitive environments. Ensure proper authentication, encryption, and access controls are in place.

This expert-level techniques section provides the foundation for implementing sophisticated Gradle build systems that can scale with large teams and complex projects. The techniques covered here require deep understanding of Gradle internals and should be implemented incrementally with proper testing and monitoring.

---

## 7. Performance Optimization

Build performance is crucial for developer productivity, especially in large Android projects. This section covers comprehensive strategies to optimize your Gradle builds, from analysis and profiling to advanced caching and parallel execution techniques.

### Build Performance Analysis

Understanding where your build spends time is the first step to optimization. Gradle provides several tools and techniques for analyzing build performance.

#### Build Scans

Build Scans provide the most comprehensive view of your build performance:

```bash
# Generate a build scan
./gradlew build --scan

# Always generate build scans
echo "org.gradle.caching=true" >> gradle.properties
echo "org.gradle.build-cache=true" >> gradle.properties
```

**Analyzing Build Scans:**

1. **Timeline View**: Shows task execution over time
2. **Performance Tab**: Identifies slow tasks and bottlenecks
3. **Dependencies Tab**: Shows dependency resolution time
4. **Build Cache Tab**: Shows cache hit/miss ratios

```gradle
// Enable build scans in build.gradle
plugins {
    id 'com.gradle.build-scan' version '3.16.2'
}

buildScan {
    termsOfServiceUrl = 'https://gradle.com/terms-of-service'
    termsOfServiceAgree = 'yes'
    
    // Capture additional information
    capture {
        taskInputFiles = true
    }
    
    // Publish automatically in CI
    publishAlways()
}
```

#### Profiling with --profile

The built-in profiler generates detailed HTML reports:

```bash
# Generate profile report
./gradlew build --profile

# Profile specific tasks
./gradlew assembleDebug --profile

# Profile with additional options
./gradlew build --profile --parallel --build-cache
```

**Profile Report Analysis:**

```gradle
// Example profile interpretation
/*
Configuration Time: 2.5s
- Project evaluation: 1.8s
- Plugin application: 0.7s

Task Execution: 45.2s
- :app:compileDebugKotlin: 15.3s (34%)
- :app:processDebugResources: 8.7s (19%)
- :app:mergeDebugResources: 6.2s (14%)
- :app:dexBuilderDebug: 5.8s (13%)
*/
```

#### Custom Performance Monitoring

```gradle
// Add timing to custom tasks
task performanceMonitoredTask {
    doFirst {
        project.ext.startTime = System.currentTimeMillis()
    }
    
    doLast {
        def duration = System.currentTimeMillis() - project.ext.startTime
        println "Task completed in ${duration}ms"
    }
    
    // Your task logic here
    doLast {
        // Task implementation
    }
}

// Monitor all tasks
gradle.taskGraph.beforeTask { Task task ->
    task.ext.startTime = System.currentTimeMillis()
}

gradle.taskGraph.afterTask { Task task, TaskState state ->
    def duration = System.currentTimeMillis() - task.ext.startTime
    println "${task.path} took ${duration}ms"
}
```

#### Build Performance Metrics

```gradle
// gradle.properties - Performance monitoring
org.gradle.logging.level=info
org.gradle.console=verbose

// Custom performance logging
class BuildPerformancePlugin implements Plugin<Project> {
    void apply(Project project) {
        project.gradle.buildFinished { result ->
            def buildTime = System.currentTimeMillis() - project.gradle.startTime
            println "Total build time: ${buildTime}ms"
            
            // Log to file for analysis
            def logFile = new File(project.rootDir, 'build-performance.log')
            logFile.append("${new Date()}: ${buildTime}ms\n")
        }
    }
}

apply plugin: BuildPerformancePlugin
```

> **💡 Tip:** Use build scans regularly during development to identify performance regressions early.

### Caching Strategies

Gradle's caching system can dramatically reduce build times by reusing outputs from previous builds and other machines.

#### Build Cache Configuration

**Local Build Cache:**

```gradle
// gradle.properties
org.gradle.caching=true
org.gradle.caching.debug=true

// settings.gradle
buildCache {
    local {
        enabled = true
        directory = new File(rootDir, 'build-cache')
        removeUnusedEntriesAfterDays = 30
    }
}
```

**Remote Build Cache:**

```gradle
// settings.gradle
buildCache {
    local {
        enabled = true
    }
    
    remote(HttpBuildCache) {
        url = 'https://your-build-cache-server.com/cache/'
        enabled = true
        push = true
        
        // Authentication
        credentials {
            username = System.getenv('BUILD_CACHE_USERNAME')
            password = System.getenv('BUILD_CACHE_PASSWORD')
        }
    }
}
```

**Docker-based Build Cache:**

```dockerfile
# Dockerfile for build cache server
FROM gradle/build-cache-node:latest
EXPOSE 5071
```

```gradle
// settings.gradle for Docker cache
buildCache {
    remote(HttpBuildCache) {
        url = 'http://localhost:5071/cache/'
        enabled = true
        push = true
    }
}
```

#### Configuration Cache

Configuration cache speeds up subsequent builds by caching the result of the configuration phase:

```gradle
// gradle.properties
org.gradle.configuration-cache=true
org.gradle.configuration-cache.problems=warn

// For strict mode (recommended for CI)
org.gradle.configuration-cache.problems=fail
```

**Configuration Cache Best Practices:**

```gradle
// ❌ Avoid - Not compatible with configuration cache
def currentTime = new Date()
android {
    defaultConfig {
        buildConfigField "String", "BUILD_TIME", "\"${currentTime}\""
    }
}

// ✅ Better - Use providers for dynamic values
android {
    defaultConfig {
        buildConfigField "String", "BUILD_TIME", "\"${new Date()}\""
    }
}

// ✅ Best - Use build-time providers
def buildTimeProvider = providers.systemProperty('build.time')
    .orElse(providers.provider { new Date().toString() })

android {
    defaultConfig {
        buildConfigField "String", "BUILD_TIME", "\"${buildTimeProvider.get()}\""
    }
}
```

#### Task Output Caching

**Making Tasks Cacheable:**

```gradle
// Custom cacheable task
@CacheableTask
class ProcessDataTask extends DefaultTask {
    @InputFile
    @PathSensitive(PathSensitivity.RELATIVE)
    File inputFile
    
    @OutputFile
    File outputFile
    
    @TaskAction
    void processData() {
        // Task implementation
        outputFile.text = inputFile.text.toUpperCase()
    }
}

// Register the task
task processData(type: ProcessDataTask) {
    inputFile = file('src/data/input.txt')
    outputFile = file('build/processed/output.txt')
}
```

**Android-Specific Caching:**

```gradle
android {
    // Enable caching for Android tasks
    buildFeatures {
        buildConfig = true
    }
    
    // Optimize resource processing
    aaptOptions {
        cruncherEnabled = false  // Disable PNG crunching for faster builds
        useNewCruncher = false
    }
    
    // Optimize compilation
    compileOptions {
        incremental = true
    }
    
    // Optimize dexing
    dexOptions {
        preDexLibraries = true
        maxProcessCount = 4
    }
}
```

#### Dependency Cache Optimization

```gradle
// Optimize dependency resolution
configurations.all {
    // Cache dynamic versions for 24 hours
    resolutionStrategy.cacheDynamicVersionsFor 24, 'hours'
    
    // Cache changing modules for 4 hours
    resolutionStrategy.cacheChangingModulesFor 4, 'hours'
    
    // Prefer modules from cache
    resolutionStrategy.preferProjectModules()
}

// Exclude unnecessary transitive dependencies
dependencies {
    implementation('com.example:library:1.0.0') {
        exclude group: 'com.google.guava', module: 'guava'
        exclude group: 'org.apache.httpcomponents'
    }
}
```

> **⚠️ Warning:** Be cautious with remote build caches in security-sensitive environments. Ensure proper authentication and consider using private cache servers.

### Parallel Execution

Gradle can execute tasks in parallel to utilize multiple CPU cores effectively.

#### Enabling Parallel Execution

```gradle
// gradle.properties
org.gradle.parallel=true
org.gradle.workers.max=4  # Number of worker processes

# Alternative: Auto-detect CPU cores
org.gradle.workers.max=auto

# Configure JVM for parallel execution
org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=512m -XX:+HeapDumpOnOutOfMemoryError
```

#### Parallel Project Execution

```gradle
// settings.gradle
// Enable parallel project builds
gradle.startParameter.parallelProjectExecutionEnabled = true

// Configure project dependencies for parallel execution
include ':app'
include ':core'
include ':feature-login'
include ':feature-profile'

// Ensure proper project dependencies
// In app/build.gradle
dependencies {
    implementation project(':core')
    implementation project(':feature-login')
    implementation project(':feature-profile')
}
```

#### Task-Level Parallelism

```gradle
// Custom parallel task execution
task parallelDataProcessing {
    doLast {
        def files = fileTree('src/data').files
        def executor = java.util.concurrent.Executors.newFixedThreadPool(4)
        
        files.each { file ->
            executor.submit {
                // Process each file in parallel
                processFile(file)
            }
        }
        
        executor.shutdown()
        executor.awaitTermination(30, java.util.concurrent.TimeUnit.SECONDS)
    }
}

// Worker API for parallel execution
abstract class DataProcessingWorkAction implements WorkAction<DataProcessingParameters> {
    @Override
    void execute() {
        def inputFile = parameters.inputFile.asFile.get()
        def outputFile = parameters.outputFile.asFile.get()
        
        // Process file
        outputFile.text = inputFile.text.toUpperCase()
    }
}

interface DataProcessingParameters extends WorkParameters {
    RegularFileProperty getInputFile()
    RegularFileProperty getOutputFile()
}

task processFilesInParallel {
    def inputDir = file('src/data')
    def outputDir = file('build/processed')
    
    doLast {
        def workerExecutor = services.get(WorkerExecutor)
        
        inputDir.listFiles().each { file ->
            workerExecutor.noIsolation().submit(DataProcessingWorkAction) {
                inputFile = file
                outputFile = new File(outputDir, file.name)
            }
        }
    }
}
```

#### Android-Specific Parallel Optimizations

```gradle
android {
    // Parallel compilation
    compileOptions {
        incremental = true
    }
    
    // Parallel dexing
    dexOptions {
        preDexLibraries = true
        maxProcessCount = Runtime.runtime.availableProcessors()
        javaMaxHeapSize = "4g"
    }
    
    // Parallel resource processing
    aaptOptions {
        additionalParameters "--no-version-vectors"
    }
    
    // Split APKs for parallel processing
    splits {
        abi {
            enable true
            reset()
            include "x86", "x86_64", "arm64-v8a", "armeabi-v7a"
            universalApk false
        }
        
        density {
            enable true
            reset()
            include "ldpi", "mdpi", "hdpi", "xhdpi", "xxhdpi", "xxxhdpi"
        }
    }
}
```

#### Monitoring Parallel Execution

```gradle
// Monitor parallel task execution
gradle.taskGraph.whenReady { taskGraph ->
    println "Parallel execution enabled: ${gradle.startParameter.parallelProjectExecutionEnabled}"
    println "Max worker count: ${gradle.startParameter.maxWorkerCount}"
    println "Total tasks: ${taskGraph.allTasks.size()}"
}

// Custom parallel execution monitoring
class ParallelExecutionMonitor {
    private final AtomicInteger runningTasks = new AtomicInteger(0)
    private final AtomicInteger maxConcurrentTasks = new AtomicInteger(0)
    
    void taskStarted() {
        int current = runningTasks.incrementAndGet()
        maxConcurrentTasks.updateAndGet { max -> Math.max(max, current) }
    }
    
    void taskFinished() {
        runningTasks.decrementAndGet()
    }
    
    int getMaxConcurrentTasks() {
        return maxConcurrentTasks.get()
    }
}

def monitor = new ParallelExecutionMonitor()

gradle.taskGraph.beforeTask { task ->
    monitor.taskStarted()
}

gradle.taskGraph.afterTask { task, state ->
    monitor.taskFinished()
}

gradle.buildFinished {
    println "Maximum concurrent tasks: ${monitor.maxConcurrentTasks}"
}
```

> **💡 Tip:** Monitor your system resources when enabling parallel execution. Too many parallel processes can actually slow down builds due to resource contention.

### Memory and Resource Optimization

Optimizing memory usage and system resources is crucial for maintaining fast, stable builds, especially in large projects.

#### JVM Memory Configuration

```gradle
// gradle.properties - JVM memory optimization
org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=1g -XX:+UseG1GC -XX:+UseStringDeduplication

# Detailed JVM configuration
org.gradle.jvmargs=-Xms2g \
  -Xmx6g \
  -XX:MaxMetaspaceSize=1g \
  -XX:+UseG1GC \
  -XX:+UseStringDeduplication \
  -XX:+UseCompressedOops \
  -XX:+HeapDumpOnOutOfMemoryError \
  -XX:HeapDumpPath=./build/heap-dump.hprof

# Kotlin compiler memory
kotlin.incremental=true
kotlin.incremental.useClasspathSnapshot=true
kotlin.build.report.output=file
kotlin.daemon.jvmargs=-Xmx2g -XX:MaxMetaspaceSize=512m
```

#### Android-Specific Memory Optimization

```gradle
android {
    // Optimize compilation memory
    compileOptions {
        incremental = true
    }
    
    // Optimize dexing memory
    dexOptions {
        javaMaxHeapSize = "4g"
        preDexLibraries = true
        incremental = true
        
        // Additional dex options for memory optimization
        additionalParameters = [
            "--multi-dex",
            "--main-dex-list-capacity=8000",
            "--minimal-main-dex"
        ]
    }
    
    // Optimize AAPT memory usage
    aaptOptions {
        cruncherEnabled = false
        useNewCruncher = false
        
        // Reduce memory usage for large projects
        additionalParameters "--no-version-vectors", "--no-version-transitions"
    }
    
    // Optimize Lint memory usage
    lintOptions {
        checkReleaseBuilds = false
        abortOnError = false
        disable 'InvalidPackage'
        
        // Reduce memory usage
        checkDependencies = false
    }
}
```

#### Build Script Memory Optimization

```gradle
// Optimize build script memory usage
buildscript {
    // Use specific versions to avoid resolution overhead
    dependencies {
        classpath 'com.android.tools.build:gradle:8.1.2'
        classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.9.10'
        
        // Exclude unnecessary transitive dependencies
        classpath('com.example:plugin:1.0.0') {
            exclude group: 'org.apache.commons'
            exclude group: 'com.google.guava'
        }
    }
}

// Optimize configuration phase
allprojects {
    // Reduce configuration overhead
    configurations.all {
        resolutionStrategy {
            // Cache dynamic versions
            cacheDynamicVersionsFor 24, 'hours'
            cacheChangingModulesFor 4, 'hours'
            
            // Fail fast on version conflicts
            failOnVersionConflict()
        }
    }
}
```

#### Resource Optimization Strategies

```gradle
// Optimize resource processing
android {
    // Resource shrinking
    buildTypes {
        release {
            shrinkResources = true
            minifyEnabled = true
            
            // Optimize resource processing
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    
    // Optimize image resources
    aaptOptions {
        cruncherEnabled = false  // Disable PNG optimization for faster builds
        
        // Custom AAPT options for resource optimization
        additionalParameters(
            "--no-version-vectors",
            "--no-version-transitions",
            "--no-auto-version"
        )
    }
    
    // Optimize vector drawables
    defaultConfig {
        vectorDrawables.useSupportLibrary = true
        vectorDrawables.generatedDensities = []
    }
    
    // Optimize build variants
    variantFilter { variant ->
        def names = variant.flavors*.name
        // Skip unnecessary build variants
        if (names.contains("demo") && variant.buildType.name == "release") {
            variant.setIgnore(true)
        }
    }
}
```

#### Dependency Optimization

```gradle
// Optimize dependency resolution
configurations.all {
    // Exclude common heavy dependencies when not needed
    exclude group: 'org.apache.httpcomponents'
    exclude group: 'commons-logging'
    exclude group: 'org.json', module: 'json'
    
    // Use specific versions to avoid resolution overhead
    resolutionStrategy {
        force 'com.google.code.gson:gson:2.10.1'
        force 'com.squareup.okhttp3:okhttp:4.12.0'
    }
}

dependencies {
    // Use implementation instead of api when possible
    implementation 'androidx.core:core-ktx:1.12.0'
    
    // Exclude unnecessary transitive dependencies
    implementation('com.squareup.retrofit2:retrofit:2.9.0') {
        exclude group: 'com.squareup.okhttp3', module: 'okhttp'
    }
    
    // Use compileOnly for annotation processors
    compileOnly 'javax.annotation:javax.annotation-api:1.3.2'
    
    // Optimize test dependencies
    testImplementation('junit:junit:4.13.2') {
        exclude group: 'org.hamcrest'
    }
}
```

#### File System Optimization

```gradle
// Optimize file system operations
task optimizeFileOperations {
    doLast {
        // Use NIO for better performance
        def sourcePath = Paths.get('src/main/assets')
        def targetPath = Paths.get('build/optimized-assets')
        
        Files.walk(sourcePath).parallel().forEach { path ->
            if (Files.isRegularFile(path)) {
                def relativePath = sourcePath.relativize(path)
                def targetFile = targetPath.resolve(relativePath)
                
                Files.createDirectories(targetFile.parent)
                Files.copy(path, targetFile, StandardCopyOption.REPLACE_EXISTING)
            }
        }
    }
}

// Optimize temporary file usage
task cleanupTempFiles {
    doLast {
        // Clean up temporary files to free disk space
        delete fileTree(dir: temporaryDir, include: '**/*')
        delete fileTree(dir: buildDir, include: '**/tmp/**')
        
        // Clean up old build artifacts
        def buildDirs = subprojects.collect { it.buildDir }
        buildDirs.each { dir ->
            if (dir.exists()) {
                def oldFiles = dir.listFiles { file ->
                    file.lastModified() < (System.currentTimeMillis() - 7 * 24 * 60 * 60 * 1000)
                }
                oldFiles?.each { it.deleteDir() }
            }
        }
    }
}
```

#### Monitoring Resource Usage

```gradle
// Monitor memory usage during build
class MemoryMonitor {
    private final Runtime runtime = Runtime.getRuntime()
    
    void logMemoryUsage(String phase) {
        def totalMemory = runtime.totalMemory() / 1024 / 1024
        def freeMemory = runtime.freeMemory() / 1024 / 1024
        def usedMemory = totalMemory - freeMemory
        def maxMemory = runtime.maxMemory() / 1024 / 1024
        
        println "${phase}: Used ${usedMemory}MB / ${totalMemory}MB (Max: ${maxMemory}MB)"
    }
}

def memoryMonitor = new MemoryMonitor()

gradle.projectsEvaluated {
    memoryMonitor.logMemoryUsage("Configuration Complete")
}

gradle.taskGraph.whenReady {
    memoryMonitor.logMemoryUsage("Task Graph Ready")
}

gradle.buildFinished {
    memoryMonitor.logMemoryUsage("Build Complete")
    
    // Force garbage collection and log final memory state
    System.gc()
    Thread.sleep(100)
    memoryMonitor.logMemoryUsage("After GC")
}
```

#### Performance Optimization Checklist

**Daily Development:**
- [ ] Use `--build-cache` for faster incremental builds
- [ ] Enable `--parallel` execution
- [ ] Use `--offline` when dependencies haven't changed
- [ ] Run `./gradlew --stop` to stop daemon when switching branches

**Project Configuration:**
- [ ] Configure appropriate JVM heap size
- [ ] Enable incremental compilation
- [ ] Use implementation instead of api dependencies
- [ ] Exclude unnecessary transitive dependencies
- [ ] Configure build cache (local and remote)

**CI/CD Optimization:**
- [ ] Use build cache servers
- [ ] Implement proper cache key strategies
- [ ] Monitor build performance metrics
- [ ] Use appropriate machine resources
- [ ] Implement build parallelization

> **⚠️ Warning:** Always test performance optimizations thoroughly. Some optimizations may have trade-offs in terms of build correctness or compatibility.

---

## 8. Cross-Platform Integration

Modern mobile development often involves cross-platform frameworks that integrate with native Android builds. Understanding how Gradle works with these frameworks is essential for maintaining efficient build processes and managing complex project structures.

### Flutter-Gradle Integration

Flutter projects use Gradle for their Android builds, creating a hybrid build system that combines Flutter's build tools with Android's Gradle-based build process.

#### Flutter Project Structure

```
flutter_project/
├── android/                    # Android-specific code and configuration
│   ├── app/
│   │   ├── build.gradle       # Android app module configuration
│   │   └── src/main/
│   │       └── AndroidManifest.xml
│   ├── build.gradle           # Project-level Gradle configuration
│   ├── gradle.properties      # Gradle properties
│   └── settings.gradle        # Project settings
├── lib/                       # Flutter/Dart code
├── pubspec.yaml              # Flutter dependencies
└── pubspec.lock
```

#### Android Module Configuration in Flutter

**Project-level build.gradle:**

```gradle
// android/build.gradle
buildscript {
    ext.kotlin_version = '1.9.10'
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.1.2'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        // Add other classpath dependencies here
        classpath 'com.google.gms:google-services:4.4.0'
        classpath 'com.google.firebase:firebase-crashlytics-gradle:2.9.9'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.buildDir = '../build'
subprojects {
    project.buildDir = "${rootProject.buildDir}/${project.name}"
}
subprojects {
    project.evaluationDependsOn(':app')
}

tasks.register("clean", Delete) {
    delete rootProject.buildDir
}
```

**App-level build.gradle:**

```gradle
// android/app/build.gradle
plugins {
    id 'com.android.application'
    id 'kotlin-android'
    id 'dev.flutter.flutter-gradle-plugin'
}

def localProperties = new Properties()
def localPropertiesFile = rootProject.file('local.properties')
if (localPropertiesFile.exists()) {
    localPropertiesFile.withReader('UTF-8') { reader ->
        localProperties.load(reader)
    }
}

def flutterVersionCode = localProperties.getProperty('flutter.versionCode')
if (flutterVersionCode == null) {
    flutterVersionCode = '1'
}

def flutterVersionName = localProperties.getProperty('flutter.versionName')
if (flutterVersionName == null) {
    flutterVersionName = '1.0'
}

android {
    namespace "com.example.flutter_app"
    compileSdk flutter.compileSdkVersion
    ndkVersion flutter.ndkVersion

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    kotlinOptions {
        jvmTarget = '1.8'
    }

    defaultConfig {
        applicationId "com.example.flutter_app"
        minSdk flutter.minSdkVersion
        targetSdk flutter.targetSdkVersion
        versionCode flutterVersionCode.toInteger()
        versionName flutterVersionName
    }

    buildTypes {
        release {
            signingConfig signingConfigs.debug
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
        debug {
            signingConfig signingConfigs.debug
        }
    }
}

flutter {
    source '../..'
}

dependencies {
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.7.0'
    implementation 'androidx.activity:activity-compose:1.8.2'
    
    // Firebase dependencies (if using)
    implementation platform('com.google.firebase:firebase-bom:32.7.0')
    implementation 'com.google.firebase:firebase-analytics'
    implementation 'com.google.firebase:firebase-crashlytics'
}
```

#### Flutter-Specific Gradle Configuration

**Flutter Gradle Plugin Configuration:**

```gradle
// Configure Flutter plugin
flutter {
    source '../..'
    
    // Custom build modes
    buildModes {
        profile {
            initWith debug
            manifestPlaceholders = [enableCrashlytics: "true"]
        }
    }
    
    // Target platforms
    target 'lib/main.dart'
    
    // Custom engine artifacts (if needed)
    engineVersion '3.16.0'
}
```

**Handling Flutter Dependencies:**

```gradle
dependencies {
    // Standard Android dependencies
    implementation 'androidx.core:core-ktx:1.12.0'
    
    // Flutter plugin dependencies are automatically handled
    // but you can add platform-specific implementations
    
    // Example: Platform-specific Firebase implementation
    implementation platform('com.google.firebase:firebase-bom:32.7.0')
    implementation 'com.google.firebase:firebase-messaging'
    
    // Native Android libraries that complement Flutter plugins
    implementation 'androidx.work:work-runtime-ktx:2.9.0'
    implementation 'androidx.biometric:biometric:1.1.0'
}
```

#### Custom Build Tasks for Flutter

```gradle
// Custom task to copy Flutter assets
task copyFlutterAssets(type: Copy) {
    from '../assets'
    into 'src/main/assets/flutter_assets'
    include '**/*.json', '**/*.png'
}

// Custom task for Flutter-specific ProGuard rules
task generateFlutterProguardRules {
    def outputFile = file('proguard-flutter.pro')
    
    doLast {
        outputFile.text = '''
# Flutter-specific ProGuard rules
-keep class io.flutter.app.** { *; }
-keep class io.flutter.plugin.** { *; }
-keep class io.flutter.util.** { *; }
-keep class io.flutter.view.** { *; }
-keep class io.flutter.** { *; }
-keep class io.flutter.plugins.** { *; }
-dontwarn io.flutter.embedding.**
'''
    }
}

// Integrate custom tasks with Flutter build
android.applicationVariants.all { variant ->
    variant.preBuild.dependsOn(copyFlutterAssets)
    if (variant.buildType.name == 'release') {
        variant.preBuild.dependsOn(generateFlutterProguardRules)
    }
}
```

#### Flutter Build Optimization

```gradle
android {
    buildTypes {
        release {
            // Flutter-optimized release configuration
            minifyEnabled true
            shrinkResources true
            
            // Use Flutter-specific ProGuard rules
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 
                         'proguard-rules.pro', 
                         'proguard-flutter.pro'
            
            // Optimize for Flutter
            ndk {
                abiFilters 'arm64-v8a', 'armeabi-v7a'
            }
        }
        
        profile {
            initWith debug
            minifyEnabled false
            shrinkResources false
            debuggable false
            
            // Profile-specific configurations
            manifestPlaceholders = [
                enableCrashlytics: "true",
                enableAnalytics: "true"
            ]
        }
    }
    
    // Flutter-specific packaging options
    packagingOptions {
        pickFirst '**/libc++_shared.so'
        pickFirst '**/libjsc.so'
        exclude 'META-INF/DEPENDENCIES'
        exclude 'META-INF/LICENSE'
        exclude 'META-INF/LICENSE.txt'
        exclude 'META-INF/NOTICE'
        exclude 'META-INF/NOTICE.txt'
    }
}
```

> **💡 Tip:** Flutter automatically manages most Gradle configurations, but you can customize the Android build process for platform-specific features and optimizations.

### React Native Considerations

React Native projects use Gradle for Android builds, but with different integration patterns compared to Flutter. Understanding these differences is crucial for effective React Native development.

#### React Native Project Structure

```
react_native_project/
├── android/                   # Android-specific code
│   ├── app/
│   │   ├── build.gradle      # App module configuration
│   │   └── src/main/
│   ├── build.gradle          # Project-level configuration
│   ├── gradle.properties     # Gradle properties
│   └── settings.gradle       # Project settings
├── ios/                      # iOS-specific code
├── src/                      # React Native JavaScript/TypeScript code
├── package.json              # Node.js dependencies
└── metro.config.js           # Metro bundler configuration
```

#### React Native Gradle Configuration

**Project-level build.gradle:**

```gradle
// android/build.gradle
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
        minSdkVersion = 21
        compileSdkVersion = 34
        targetSdkVersion = 34
        ndkVersion = "25.1.8937393"
        kotlinVersion = "1.9.10"
    }
    
    repositories {
        google()
        mavenCentral()
    }
    
    dependencies {
        classpath 'com.android.tools.build:gradle:8.1.2'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion"
        classpath 'com.facebook.react:react-native-gradle-plugin'
        
        // Additional classpath dependencies
        classpath 'com.google.gms:google-services:4.4.0'
        classpath 'com.google.firebase:firebase-crashlytics-gradle:2.9.9'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://www.jitpack.io' }
        
        // React Native-specific repositories
        maven { url 'https://maven.google.com' }
        maven { url 'https://jcenter.bintray.com/' }
        
        // Local React Native repository
        maven {
            url("${rootDir}/../node_modules/react-native/android")
            name("React Native")
        }
    }
}
```

**App-level build.gradle:**

```gradle
// android/app/build.gradle
apply plugin: 'com.android.application'
apply plugin: 'org.jetbrains.kotlin.android'
apply plugin: 'com.facebook.react'

// React Native configuration
react {
    /* Folders */
    root = file("../")
    reactNativeDir = file("../node_modules/react-native")
    codegenDir = file("../node_modules/@react-native/codegen")
    cliFile = file("../node_modules/@react-native/cli/build/bin.js")
    
    /* Variants */
    debuggableVariants = ["liveDebug", "stagingDebug"]
    
    /* Bundling */
    bundleCommand = "ram-bundle"
    bundleConfig = file(../bundle-config.js)
    bundleAssetName = "MyApp.android.bundle"
    entryFile = file("../index.js")
    extraPackagerArgs = []
    
    /* Hermes JS Engine */
    enableHermes = true
    
    /* Debugging */
    deleteDebugFilesForVariant = { variant ->
        variant.name.contains("release")
    }
}

android {
    namespace "com.example.reactnativeapp"
    compileSdk rootProject.ext.compileSdkVersion

    defaultConfig {
        applicationId "com.example.reactnativeapp"
        minSdk rootProject.ext.minSdkVersion
        targetSdk rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        
        // React Native specific configurations
        missingDimensionStrategy 'react-native-camera', 'general'
        multiDexEnabled true
    }
    
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
            debuggable true
            minifyEnabled false
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro"
        }
    }
    
    // React Native specific packaging options
    packagingOptions {
        pickFirst '**/libc++_shared.so'
        pickFirst '**/libjsc.so'
        exclude 'META-INF/DEPENDENCIES'
        exclude 'META-INF/LICENSE'
        exclude 'META-INF/LICENSE.txt'
        exclude 'META-INF/NOTICE'
        exclude 'META-INF/NOTICE.txt'
    }
}

dependencies {
    implementation 'com.facebook.react:react-android'
    implementation 'com.facebook.react:flipper-integration'
    
    // React Native community packages
    implementation project(':react-native-vector-icons')
    implementation project(':react-native-gesture-handler')
    implementation project(':react-native-reanimated')
    
    // Standard Android dependencies
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    
    // Debugging tools
    debugImplementation 'com.facebook.flipper:flipper:0.182.0'
    debugImplementation 'com.facebook.flipper:flipper-network-plugin:0.182.0'
    debugImplementation 'com.facebook.flipper:flipper-fresco-plugin:0.182.0'
    
    if (hermesEnabled.toBoolean()) {
        implementation 'com.facebook.react:hermes-android'
    } else {
        implementation 'org.webkit:android-jsc:+'
    }
}
```

#### React Native Auto-linking

React Native 0.60+ includes auto-linking, which automatically links native dependencies:

```gradle
// settings.gradle - Auto-linking configuration
include ':react-native-vector-icons'
project(':react-native-vector-icons').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-vector-icons/android')

include ':react-native-gesture-handler'
project(':react-native-gesture-handler').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-gesture-handler/android')

// For packages that don't support auto-linking
include ':react-native-custom-package'
project(':react-native-custom-package').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-custom-package/android')
```

#### Custom React Native Build Tasks

```gradle
// Custom task to bundle React Native code
task bundleReleaseJsAndAssets(type: Exec) {
    workingDir project.rootDir.parent
    commandLine "npx", "react-native", "bundle", 
                "--platform", "android",
                "--dev", "false",
                "--entry-file", "index.js",
                "--bundle-output", "android/app/src/main/assets/index.android.bundle",
                "--assets-dest", "android/app/src/main/res"
}

// Custom task for React Native code generation
task generateCodegenArtifacts(type: Exec) {
    workingDir project.rootDir.parent
    commandLine "npx", "@react-native/codegen", "android"
}

// Integrate with Android build
android.applicationVariants.all { variant ->
    if (variant.buildType.name == 'release') {
        variant.preBuild.dependsOn(bundleReleaseJsAndAssets)
    }
    variant.preBuild.dependsOn(generateCodegenArtifacts)
}
```

#### React Native Performance Optimization

```gradle
android {
    buildTypes {
        release {
            // React Native optimizations
            minifyEnabled true
            shrinkResources true
            
            // Hermes-specific optimizations
            if (project.ext.react.enableHermes) {
                proguardFiles getDefaultProguardFile("proguard-android-optimize.txt"), 
                             "proguard-rules.pro",
                             "proguard-hermes.pro"
            }
            
            // Bundle optimization
            bundleCommand = "ram-bundle"
            
            // Native library optimization
            ndk {
                abiFilters "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
            }
        }
    }
    
    // React Native specific compile options
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_11
        targetCompatibility JavaVersion.VERSION_11
    }
    
    kotlinOptions {
        jvmTarget = '11'
    }
}
```

> **⚠️ Warning:** React Native auto-linking can sometimes conflict with manual linking. Always check the React Native upgrade guide when updating versions.

### Platform-Specific Configurations

Cross-platform projects often require different configurations for different platforms, build environments, or deployment targets. Gradle provides several mechanisms to handle these variations.

#### Build Variants for Cross-Platform

```gradle
android {
    flavorDimensions "platform", "environment"
    
    productFlavors {
        // Platform dimension
        flutter {
            dimension "platform"
            applicationIdSuffix ".flutter"
            versionNameSuffix "-flutter"
            
            // Flutter-specific configurations
            buildConfigField "boolean", "IS_FLUTTER", "true"
            buildConfigField "boolean", "IS_REACT_NATIVE", "false"
        }
        
        reactnative {
            dimension "platform"
            applicationIdSuffix ".rn"
            versionNameSuffix "-rn"
            
            // React Native-specific configurations
            buildConfigField "boolean", "IS_FLUTTER", "false"
            buildConfigField "boolean", "IS_REACT_NATIVE", "true"
        }
        
        native {
            dimension "platform"
            applicationIdSuffix ".native"
            versionNameSuffix "-native"
            
            // Native Android-specific configurations
            buildConfigField "boolean", "IS_FLUTTER", "false"
            buildConfigField "boolean", "IS_REACT_NATIVE", "false"
        }
        
        // Environment dimension
        development {
            dimension "environment"
            applicationIdSuffix ".dev"
            versionNameSuffix "-dev"
            
            buildConfigField "String", "API_BASE_URL", '"https://api-dev.example.com"'
            buildConfigField "boolean", "DEBUG_MODE", "true"
        }
        
        staging {
            dimension "environment"
            applicationIdSuffix ".staging"
            versionNameSuffix "-staging"
            
            buildConfigField "String", "API_BASE_URL", '"https://api-staging.example.com"'
            buildConfigField "boolean", "DEBUG_MODE", "false"
        }
        
        production {
            dimension "environment"
            
            buildConfigField "String", "API_BASE_URL", '"https://api.example.com"'
            buildConfigField "boolean", "DEBUG_MODE", "false"
        }
    }
    
    // Variant-specific configurations
    applicationVariants.all { variant ->
        def flavorName = variant.flavorName
        def buildType = variant.buildType.name
        
        // Platform-specific source sets
        if (flavorName.contains("flutter")) {
            variant.sourceSets.each { sourceSet ->
                sourceSet.java.srcDirs += 'src/flutter/java'
                sourceSet.res.srcDirs += 'src/flutter/res'
            }
        } else if (flavorName.contains("reactnative")) {
            variant.sourceSets.each { sourceSet ->
                sourceSet.java.srcDirs += 'src/reactnative/java'
                sourceSet.res.srcDirs += 'src/reactnative/res'
            }
        }
        
        // Environment-specific configurations
        if (flavorName.contains("development")) {
            variant.buildConfigField "boolean", "ENABLE_LOGGING", "true"
            variant.resValue "string", "app_name", "MyApp (Dev)"
        } else if (flavorName.contains("staging")) {
            variant.buildConfigField "boolean", "ENABLE_LOGGING", "true"
            variant.resValue "string", "app_name", "MyApp (Staging)"
        } else if (flavorName.contains("production")) {
            variant.buildConfigField "boolean", "ENABLE_LOGGING", "false"
            variant.resValue "string", "app_name", "MyApp"
        }
    }
}
```

#### Conditional Dependencies Based on Platform

```gradle
dependencies {
    // Common dependencies for all platforms
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    
    // Flutter-specific dependencies
    flutterImplementation 'io.flutter:flutter_embedding_debug:1.0.0-4c4c43d12b'
    flutterImplementation 'io.flutter:flutter_embedding_profile:1.0.0-4c4c43d12b'
    flutterImplementation 'io.flutter:flutter_embedding_release:1.0.0-4c4c43d12b'
    
    // React Native-specific dependencies
    reactnativeImplementation 'com.facebook.react:react-native:0.72.6'
    reactnativeImplementation 'com.facebook.react:flipper-integration:0.72.6'
    
    // Native Android-specific dependencies
    nativeImplementation 'androidx.navigation:navigation-fragment-ktx:2.7.5'
    nativeImplementation 'androidx.navigation:navigation-ui-ktx:2.7.5'
    
    // Environment-specific dependencies
    developmentImplementation 'com.squareup.leakcanary:leakcanary-android:2.12'
    stagingImplementation 'com.squareup.leakcanary:leakcanary-android:2.12'
    
    // Debug tools for development and staging
    developmentImplementation 'com.facebook.flipper:flipper:0.182.0'
    stagingImplementation 'com.facebook.flipper:flipper:0.182.0'
}
```

#### Platform-Specific Build Tasks

```gradle
// Flutter-specific tasks
task buildFlutterBundle(type: Exec) {
    workingDir '../'
    commandLine 'flutter', 'build', 'appbundle', '--release'
}

// React Native-specific tasks
task buildReactNativeBundle(type: Exec) {
    workingDir '../'
    commandLine 'npx', 'react-native', 'bundle',
                '--platform', 'android',
                '--dev', 'false',
                '--entry-file', 'index.js',
                '--bundle-output', 'android/app/src/main/assets/index.android.bundle'
}

// Native Android-specific tasks
task buildNativeBundle {
    dependsOn 'bundleRelease'
    doLast {
        println "Building native Android bundle"
    }
}

// Conditional task execution based on variant
android.applicationVariants.all { variant ->
    def variantName = variant.name
    def flavorName = variant.flavorName
    
    if (flavorName.contains("flutter")) {
        variant.preBuild.dependsOn(buildFlutterBundle)
    } else if (flavorName.contains("reactnative")) {
        variant.preBuild.dependsOn(buildReactNativeBundle)
    } else if (flavorName.contains("native")) {
        variant.preBuild.dependsOn(buildNativeBundle)
    }
}
```

#### Cross-Platform Resource Management

```gradle
android {
    sourceSets {
        main {
            // Common resources
            res.srcDirs = ['src/main/res']
            assets.srcDirs = ['src/main/assets']
        }
        
        // Platform-specific source sets
        flutter {
            res.srcDirs = ['src/flutter/res']
            assets.srcDirs = ['src/flutter/assets']
            java.srcDirs = ['src/flutter/java']
        }
        
        reactnative {
            res.srcDirs = ['src/reactnative/res']
            assets.srcDirs = ['src/reactnative/assets']
            java.srcDirs = ['src/reactnative/java']
        }
        
        native {
            res.srcDirs = ['src/native/res']
            assets.srcDirs = ['src/native/assets']
            java.srcDirs = ['src/native/java']
        }
        
        // Environment-specific resources
        development {
            res.srcDirs = ['src/development/res']
        }
        
        staging {
            res.srcDirs = ['src/staging/res']
        }
        
        production {
            res.srcDirs = ['src/production/res']
        }
    }
}
```

> **💡 Tip:** Use source sets and build variants to organize platform-specific code and resources, making your cross-platform project more maintainable.

### Cross-Platform Dependency Management

Managing dependencies across different platforms and frameworks requires careful coordination to avoid conflicts and ensure compatibility.

#### Unified Dependency Versions

**gradle.properties for Version Management:**

```properties
# gradle.properties
# Kotlin and Android versions
kotlin_version=1.9.10
android_gradle_plugin_version=8.1.2
compile_sdk_version=34
min_sdk_version=21
target_sdk_version=34

# AndroidX versions
androidx_core_version=1.12.0
androidx_appcompat_version=1.6.1
androidx_lifecycle_version=2.7.0
androidx_navigation_version=2.7.5

# Cross-platform framework versions
flutter_version=3.16.0
react_native_version=0.72.6

# Third-party library versions
retrofit_version=2.9.0
okhttp_version=4.12.0
gson_version=2.10.1
room_version=2.6.0

# Firebase versions
firebase_bom_version=32.7.0

# Testing versions
junit_version=4.13.2
espresso_version=3.5.1
mockito_version=5.7.0
```

**Project-level Dependency Management:**

```gradle
// build.gradle (project level)
buildscript {
    // Load properties
    ext.kotlin_version = project.property('kotlin_version')
    ext.android_gradle_plugin_version = project.property('android_gradle_plugin_version')
    
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
    
    dependencies {
        classpath "com.android.tools.build:gradle:$android_gradle_plugin_version"
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        
        // Cross-platform framework plugins
        classpath 'dev.flutter.flutter-gradle-plugin:1.0.0'
        classpath 'com.facebook.react:react-native-gradle-plugin:0.72.6'
        
        // Additional plugins
        classpath 'com.google.gms:google-services:4.4.0'
        classpath 'com.google.firebase:firebase-crashlytics-gradle:2.9.9'
        classpath 'androidx.navigation:navigation-safe-args-gradle-plugin:2.7.5'
    }
}

// Shared configuration for all subprojects
subprojects {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }
        
        // Platform-specific repositories
        if (project.name.contains('flutter')) {
            maven { url 'https://storage.googleapis.com/download.flutter.io' }
        }
        
        if (project.name.contains('reactnative')) {
            maven { url "${rootDir}/../node_modules/react-native/android" }
        }
    }
    
    // Common configurations
    afterEvaluate { project ->
        if (project.hasProperty('android')) {
            android {
                compileSdkVersion project.property('compile_sdk_version').toInteger()
                
                defaultConfig {
                    minSdkVersion project.property('min_sdk_version').toInteger()
                    targetSdkVersion project.property('target_sdk_version').toInteger()
                }
                
                compileOptions {
                    sourceCompatibility JavaVersion.VERSION_1_8
                    targetCompatibility JavaVersion.VERSION_1_8
                }
                
                if (project.hasProperty('kotlinOptions')) {
                    kotlinOptions {
                        jvmTarget = '1.8'
                    }
                }
            }
        }
    }
}
```

#### Dependency Catalogs for Cross-Platform Projects

**gradle/libs.versions.toml:**

```toml
[versions]
# Core versions
kotlin = "1.9.10"
android-gradle-plugin = "8.1.2"
compile-sdk = "34"
min-sdk = "21"
target-sdk = "34"

# AndroidX versions
androidx-core = "1.12.0"
androidx-appcompat = "1.6.1"
androidx-lifecycle = "2.7.0"
androidx-navigation = "2.7.5"
androidx-room = "2.6.0"

# Cross-platform frameworks
flutter = "3.16.0"
react-native = "0.72.6"

# Networking
retrofit = "2.9.0"
okhttp = "4.12.0"
gson = "2.10.1"

# Firebase
firebase-bom = "32.7.0"

# Testing
junit = "4.13.2"
espresso = "3.5.1"
mockito = "5.7.0"

[libraries]
# AndroidX libraries
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "androidx-core" }
androidx-appcompat = { group = "androidx.appcompat", name = "appcompat", version.ref = "androidx-appcompat" }
androidx-lifecycle-runtime = { group = "androidx.lifecycle", name = "lifecycle-runtime-ktx", version.ref = "androidx-lifecycle" }
androidx-navigation-fragment = { group = "androidx.navigation", name = "navigation-fragment-ktx", version.ref = "androidx-navigation" }
androidx-navigation-ui = { group = "androidx.navigation", name = "navigation-ui-ktx", version.ref = "androidx-navigation" }

# Room database
androidx-room-runtime = { group = "androidx.room", name = "room-runtime", version.ref = "androidx-room" }
androidx-room-compiler = { group = "androidx.room", name = "room-compiler", version.ref = "androidx-room" }
androidx-room-ktx = { group = "androidx.room", name = "room-ktx", version.ref = "androidx-room" }

# Networking
retrofit = { group = "com.squareup.retrofit2", name = "retrofit", version.ref = "retrofit" }
retrofit-gson = { group = "com.squareup.retrofit2", name = "converter-gson", version.ref = "retrofit" }
okhttp = { group = "com.squareup.okhttp3", name = "okhttp", version.ref = "okhttp" }
okhttp-logging = { group = "com.squareup.okhttp3", name = "logging-interceptor", version.ref = "okhttp" }
gson = { group = "com.google.code.gson", name = "gson", version.ref = "gson" }

# Firebase
firebase-bom = { group = "com.google.firebase", name = "firebase-bom", version.ref = "firebase-bom" }
firebase-analytics = { group = "com.google.firebase", name = "firebase-analytics" }
firebase-crashlytics = { group = "com.google.firebase", name = "firebase-crashlytics" }
firebase-messaging = { group = "com.google.firebase", name = "firebase-messaging" }

# Cross-platform specific
flutter-embedding = { group = "io.flutter", name = "flutter_embedding_debug", version = "1.0.0-4c4c43d12b" }
react-native = { group = "com.facebook.react", name = "react-native", version.ref = "react-native" }

# Testing
junit = { group = "junit", name = "junit", version.ref = "junit" }
androidx-test-ext-junit = { group = "androidx.test.ext", name = "junit", version = "1.1.5" }
espresso-core = { group = "androidx.test.espresso", name = "espresso-core", version.ref = "espresso" }
mockito-core = { group = "org.mockito", name = "mockito-core", version.ref = "mockito" }

[bundles]
# Common Android dependencies
android-core = ["androidx-core-ktx", "androidx-appcompat", "androidx-lifecycle-runtime"]
networking = ["retrofit", "retrofit-gson", "okhttp", "okhttp-logging", "gson"]
navigation = ["androidx-navigation-fragment", "androidx-navigation-ui"]
room = ["androidx-room-runtime", "androidx-room-ktx"]
firebase = ["firebase-analytics", "firebase-crashlytics", "firebase-messaging"]
testing = ["junit", "androidx-test-ext-junit", "espresso-core", "mockito-core"]

[plugins]
android-application = { id = "com.android.application", version.ref = "android-gradle-plugin" }
android-library = { id = "com.android.library", version.ref = "android-gradle-plugin" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
kotlin-kapt = { id = "org.jetbrains.kotlin.kapt", version.ref = "kotlin" }
navigation-safe-args = { id = "androidx.navigation.safeargs.kotlin", version.ref = "androidx-navigation" }
google-services = { id = "com.google.gms.google-services", version = "4.4.0" }
firebase-crashlytics = { id = "com.google.firebase.crashlytics", version = "2.9.9" }
```

**Using Dependency Catalogs:**

```gradle
// build.gradle (app module)
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.kapt)
    alias(libs.plugins.navigation.safe.args)
    alias(libs.plugins.google.services)
    alias(libs.plugins.firebase.crashlytics)
}

dependencies {
    // Use bundles for common dependency groups
    implementation libs.bundles.android.core
    implementation libs.bundles.networking
    implementation libs.bundles.navigation
    implementation libs.bundles.room
    
    // Firebase BOM for version management
    implementation platform(libs.firebase.bom)
    implementation libs.bundles.firebase
    
    // Room annotation processor
    kapt libs.androidx.room.compiler
    
    // Platform-specific dependencies
    if (project.hasProperty('flutter')) {
        implementation libs.flutter.embedding
    }
    
    if (project.hasProperty('reactnative')) {
        implementation libs.react.native
    }
    
    // Testing dependencies
    testImplementation libs.bundles.testing
    androidTestImplementation libs.bundles.testing
}
```

#### Dependency Conflict Resolution

```gradle
configurations.all {
    resolutionStrategy {
        // Force specific versions to resolve conflicts
        force 'org.jetbrains.kotlin:kotlin-stdlib:1.9.10'
        force 'org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.9.10'
        
        // Exclude problematic transitive dependencies
        exclude group: 'org.jetbrains.kotlin', module: 'kotlin-stdlib-jre7'
        exclude group: 'org.jetbrains.kotlin', module: 'kotlin-stdlib-jre8'
        
        // Prefer modules from specific groups
        preferProjectModules()
        
        // Fail on version conflict
        failOnVersionConflict()
        
        // Cache dynamic versions for stability
        cacheDynamicVersionsFor 10, 'minutes'
        cacheChangingModulesFor 4, 'hours'
    }
    
    // Exclude specific dependencies that cause conflicts
    exclude group: 'com.android.support'
    exclude group: 'androidx.legacy', module: 'legacy-support-v4'
}

// Platform-specific conflict resolution
android.applicationVariants.all { variant ->
    def variantName = variant.name
    
    if (variantName.contains("flutter")) {
        configurations."${variantName}Implementation" {
            exclude group: 'io.flutter', module: 'flutter_embedding_debug'
        }
    }
    
    if (variantName.contains("reactnative")) {
        configurations."${variantName}Implementation" {
            exclude group: 'com.facebook.react', module: 'react-native'
        }
    }
}
```

#### Cross-Platform Testing Dependencies

```gradle
dependencies {
    // Common testing dependencies
    testImplementation 'junit:junit:4.13.2'
    testImplementation 'org.mockito:mockito-core:5.7.0'
    testImplementation 'org.mockito:mockito-kotlin:5.2.1'
    testImplementation 'org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3'
    
    // Android instrumented testing
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation 'androidx.test:runner:1.5.2'
    androidTestImplementation 'androidx.test:rules:1.5.0'
    
    // Flutter-specific testing (when applicable)
    flutterTestImplementation 'io.flutter:flutter_test:1.0.0'
    flutterAndroidTestImplementation 'io.flutter:flutter_driver:1.0.0'
    
    // React Native-specific testing (when applicable)
    reactnativeTestImplementation 'com.facebook.react:react-native-test-utils:0.72.6'
    
    // Cross-platform integration testing
    androidTestImplementation 'androidx.test.uiautomator:uiautomator:2.2.0'
    androidTestImplementation 'com.squareup.okhttp3:mockwebserver:4.12.0'
}
```

> **📝 Note:** Cross-platform dependency management requires careful version coordination and conflict resolution. Use dependency catalogs and version management strategies to maintain consistency across different platforms and frameworks.

This comprehensive Cross-Platform Integration section provides developers with the knowledge needed to effectively manage Gradle builds in complex cross-platform environments, ensuring smooth integration between different frameworks and maintaining build consistency across platforms.

---

## 9. Troubleshooting & Best Practices

### Common Build Issues

Android Gradle builds can fail for various reasons. Understanding common issues and their solutions will save you significant development time.

#### Build Configuration Issues

**Problem: "Could not find com.android.tools.build:gradle"**

```
FAILURE: Build failed with an exception.
* What went wrong:
A problem occurred configuring root project 'MyApp'.
> Could not resolve all artifacts for configuration ':classpath'.
   > Could not find com.android.tools.build:gradle:8.1.2.
```

**Solution:**
```gradle
// Ensure correct repositories in project-level build.gradle
buildscript {
    repositories {
        google()        // Required for Android Gradle Plugin
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.1.2'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}
```

**Problem: "Minimum supported Gradle version is X.X"**

```
Android Gradle plugin requires Java 11 to run. You are currently using Java 8.
Your current JDK is located in /usr/lib/jvm/java-8-openjdk-amd64
You can try some of the following options:
  - changing the IDE settings.
  - changing the JAVA_HOME environment variable.
  - changing `org.gradle.java.home` in `gradle.properties`.
```

**Solution:**
```properties
# gradle.properties
org.gradle.java.home=/path/to/java11

# Or update JAVA_HOME environment variable
export JAVA_HOME=/path/to/java11
```

**Problem: "Duplicate class found in modules"**

```
Duplicate class androidx.lifecycle.ViewModelLazy found in modules:
lifecycle-viewmodel-2.3.1 (androidx.lifecycle:lifecycle-viewmodel:2.3.1)
lifecycle-viewmodel-ktx-2.4.0 (androidx.lifecycle:lifecycle-viewmodel-ktx:2.4.0)
```

**Solution:**
```gradle
dependencies {
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.6.2'
    // Remove conflicting dependency or use BOM
    implementation platform('androidx.compose:compose-bom:2023.10.01')
    
    // Or exclude specific transitive dependencies
    implementation('com.example.library:library:1.0.0') {
        exclude group: 'androidx.lifecycle', module: 'lifecycle-viewmodel'
    }
}
```

#### Dependency Resolution Issues

**Problem: "Could not resolve dependency"**

```
Could not resolve com.squareup.retrofit2:retrofit:2.9.0.
Required by:
    project :app
 > Could not resolve com.squareup.retrofit2:retrofit:2.9.0.
    > Could not get resource 'https://repo1.maven.org/maven2/com/squareup/retrofit2/retrofit/2.9.0/retrofit-2.9.0.pom'.
       > Could not GET 'https://repo1.maven.org/maven2/com/squareup/retrofit2/retrofit/2.9.0/retrofit-2.9.0.pom'.
          > Connect to repo1.maven.org:443 [repo1.maven.org/151.101.112.209] failed: Connection timed out
```

**Solutions:**
```gradle
// 1. Check repository order and availability
repositories {
    google()
    mavenCentral()
    // Add backup repositories
    maven { url 'https://jcenter.bintray.com' }
}

// 2. Use dependency resolution strategy
configurations.all {
    resolutionStrategy {
        // Force specific versions
        force 'com.squareup.retrofit2:retrofit:2.9.0'
        
        // Fail on version conflict
        failOnVersionConflict()
        
        // Cache dynamic versions
        cacheDynamicVersionsFor 10, 'minutes'
        cacheChangingModulesFor 4, 'hours'
    }
}

// 3. Use offline mode for network issues
// gradle.properties
org.gradle.offline=true
```

**Problem: "Version conflict between dependencies"**

```
Conflict with dependency 'com.google.code.gson:gson' in project ':app'. 
Resolved versions for app (2.8.9) and test app (2.8.6) differ.
```

**Solution:**
```gradle
// Use BOM (Bill of Materials) for version alignment
dependencies {
    implementation platform('com.squareup.retrofit2:retrofit-bom:2.9.0')
    implementation 'com.squareup.retrofit2:retrofit'
    implementation 'com.squareup.retrofit2:converter-gson'
    
    // Or force specific versions
    implementation('com.google.code.gson:gson:2.10.1') {
        force = true
    }
}

// Global resolution strategy
configurations.all {
    resolutionStrategy.eachDependency { details ->
        if (details.requested.group == 'com.google.code.gson') {
            details.useVersion '2.10.1'
        }
    }
}
```

#### Android-Specific Build Issues

**Problem: "Manifest merger failed"**

```
Manifest merger failed : Attribute application@appComponentFactory 
value=(androidx.core.app.CoreComponentFactory) from [androidx.core:core:1.12.0] 
AndroidManifest.xml:22:18-91
is also present at [androidx.core:core:1.0.0] AndroidManifest.xml:22:18-86 
value=(android.support.v4.app.CoreComponentFactory).
```

**Solution:**
```xml
<!-- AndroidManifest.xml -->
<application
    android:name=".MyApplication"
    tools:replace="android:appComponentFactory"
    android:appComponentFactory="androidx.core.app.CoreComponentFactory">
    
    <!-- Or use tools:node="remove" to remove conflicting attributes -->
    <activity android:name=".MainActivity"
        tools:node="merge" />
</application>
```

```gradle
// build.gradle - Alternative solution
android {
    packagingOptions {
        pickFirst '**/AndroidManifest.xml'
    }
}
```

**Problem: "R8/ProGuard obfuscation issues"**

```
Missing class com.example.MyClass (referenced from: com.example.MainActivity)
```

**Solution:**
```proguard
# proguard-rules.pro
# Keep specific classes
-keep class com.example.MyClass { *; }

# Keep all classes in a package
-keep class com.example.model.** { *; }

# Keep classes with specific annotations
-keep @com.example.KeepThis class * { *; }

# Keep enum classes
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Keep Parcelable implementations
-keep class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator *;
}

# Retrofit specific rules
-keepattributes Signature, InnerClasses, EnclosingMethod
-keepattributes RuntimeVisibleAnnotations, RuntimeVisibleParameterAnnotations
-keep,allowshrinking,allowoptimization interface * {
    @retrofit2.http.* <methods>;
}
```

**Problem: "Build cache corruption"**

```
Build cache entry ... is corrupt. Discarding.
```

**Solution:**
```bash
# Clean build cache
./gradlew cleanBuildCache

# Clean all build artifacts
./gradlew clean

# Delete .gradle directory (nuclear option)
rm -rf ~/.gradle/caches/
rm -rf .gradle/

# Disable build cache temporarily
# gradle.properties
org.gradle.caching=false
```

#### Memory and Performance Issues

**Problem: "OutOfMemoryError during build"**

```
java.lang.OutOfMemoryError: Java heap space
```

**Solution:**
```properties
# gradle.properties
org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=512m -XX:+HeapDumpOnOutOfMemoryError

# For large projects
org.gradle.jvmargs=-Xmx8g -XX:MaxMetaspaceSize=1g

# Enable parallel builds
org.gradle.parallel=true
org.gradle.workers.max=4

# Enable configuration cache (Gradle 6.6+)
org.gradle.configuration-cache=true

# Enable build cache
org.gradle.caching=true
```

**Problem: "Slow build times"**

**Solutions:**
```properties
# gradle.properties - Performance optimizations
org.gradle.daemon=true
org.gradle.parallel=true
org.gradle.configureondemand=true
org.gradle.caching=true
org.gradle.workers.max=4

# JVM optimizations
org.gradle.jvmargs=-Xmx4g -XX:+UseG1GC -XX:MaxGCPauseMillis=200

# Android-specific optimizations
android.enableJetifier=false
android.useAndroidX=true
android.enableR8.fullMode=true
```

```gradle
// build.gradle optimizations
android {
    // Use latest build tools
    buildToolsVersion "34.0.0"
    
    // Enable build optimizations
    buildFeatures {
        buildConfig false    // Disable if not needed
        resValues false     // Disable if not needed
        shaders false       // Disable if not needed
    }
    
    // Optimize compilation
    compileOptions {
        incremental true
    }
    
    // Optimize dexing
    dexOptions {
        preDexLibraries true
        maxProcessCount 8
    }
}
```

### Debugging Techniques

Effective debugging is crucial for resolving complex build issues and understanding Gradle behavior.

#### Gradle Logging and Verbosity

**Log Levels:**
```bash
# Quiet - only show errors
./gradlew build --quiet

# Default - lifecycle and higher
./gradlew build

# Info - includes task execution info
./gradlew build --info

# Debug - detailed debugging information
./gradlew build --debug

# Specific task debugging
./gradlew assembleDebug --info --stacktrace
```

**Build Scan:**
```gradle
// Enable build scans for detailed analysis
plugins {
    id 'com.gradle.build-scan' version '3.16.1'
}

buildScan {
    termsOfServiceUrl = 'https://gradle.com/terms-of-service'
    termsOfServiceAgree = 'yes'
    publishAlways()
}
```

```bash
# Generate build scan
./gradlew build --scan
```

#### Dependency Analysis

**View Dependency Tree:**
```bash
# All dependencies
./gradlew dependencies

# Specific configuration
./gradlew dependencies --configuration implementation

# Specific project
./gradlew :app:dependencies

# Find specific dependency
./gradlew dependencyInsight --dependency retrofit2
./gradlew dependencyInsight --dependency com.squareup.retrofit2:retrofit
```

**Analyze Dependency Conflicts:**
```bash
# Show version conflicts
./gradlew dependencies --configuration implementation | grep "(*)"

# Detailed conflict resolution
./gradlew dependencyInsight --dependency gson --configuration implementation
```

**Generate Dependency Report:**
```gradle
// Add to build.gradle
apply plugin: 'project-report'

// Generate reports
./gradlew dependencyReport
./gradlew htmlDependencyReport
```

#### Task Analysis and Profiling

**Task Execution Analysis:**
```bash
# Show task execution times
./gradlew build --profile

# Show task dependencies
./gradlew assembleDebug --dry-run

# Show all tasks that would execute
./gradlew build --dry-run --info
```

**Build Performance Profiling:**
```bash
# Generate performance profile
./gradlew build --profile --offline --rerun-tasks

# Analyze specific task performance
./gradlew :app:compileDebugJavaWithJavac --profile
```

**Custom Task Debugging:**
```gradle
task debugTask {
    doFirst {
        println "Task inputs: ${inputs.files.asPath}"
        println "Task outputs: ${outputs.files.asPath}"
        println "Project properties: ${project.properties}"
    }
    
    doLast {
        println "Task completed successfully"
    }
}
```

#### Build Script Debugging

**Print Configuration Values:**
```gradle
android {
    applicationVariants.all { variant ->
        println "Variant: ${variant.name}"
        println "Application ID: ${variant.applicationId}"
        println "Version Name: ${variant.versionName}"
        println "Build Type: ${variant.buildType.name}"
        
        variant.outputs.each { output ->
            println "Output file: ${output.outputFile}"
        }
    }
}
```

**Debug Custom Logic:**
```gradle
task debugBuildLogic {
    doLast {
        println "Gradle version: ${gradle.gradleVersion}"
        println "Project name: ${project.name}"
        println "Build directory: ${buildDir}"
        println "Source sets: ${android.sourceSets.names}"
        
        configurations.each { config ->
            println "Configuration: ${config.name}"
            if (config.canBeResolved) {
                config.resolvedConfiguration.resolvedArtifacts.each { artifact ->
                    println "  - ${artifact.moduleVersion.id}"
                }
            }
        }
    }
}
```

#### IDE Integration Debugging

**Android Studio Gradle Sync Issues:**
```bash
# Invalidate caches and restart
# File -> Invalidate Caches and Restart

# Refresh Gradle project
# Click "Sync Project with Gradle Files" button

# Check Gradle settings
# File -> Settings -> Build -> Gradle
```

**Gradle Daemon Issues:**
```bash
# Stop all Gradle daemons
./gradlew --stop

# Check daemon status
./gradlew --status

# Force daemon restart
./gradlew --no-daemon build
```

### Industry Best Practices

Following industry best practices ensures maintainable, efficient, and reliable builds.

#### Project Structure Best Practices

**Modular Architecture:**
```
MyApp/
├── app/                    # Main application module
├── core/                   # Core business logic
│   ├── common/            # Common utilities
│   ├── network/           # Network layer
│   └── database/          # Database layer
├── feature/               # Feature modules
│   ├── login/
│   ├── profile/
│   └── settings/
├── ui/                    # UI components
│   ├── design-system/     # Design system
│   └── common/           # Common UI components
└── buildSrc/             # Build logic
```

**Build Script Organization:**
```gradle
// buildSrc/src/main/kotlin/Dependencies.kt
object Versions {
    const val kotlin = "1.9.10"
    const val androidGradlePlugin = "8.1.2"
    const val compileSdk = 34
    const val minSdk = 24
    const val targetSdk = 34
}

object Dependencies {
    const val kotlinStdlib = "org.jetbrains.kotlin:kotlin-stdlib:${Versions.kotlin}"
    const val androidxCore = "androidx.core:core-ktx:1.12.0"
    const val androidxAppcompat = "androidx.appcompat:appcompat:1.6.1"
    
    object Network {
        private const val retrofitVersion = "2.9.0"
        const val retrofit = "com.squareup.retrofit2:retrofit:$retrofitVersion"
        const val retrofitGson = "com.squareup.retrofit2:converter-gson:$retrofitVersion"
    }
    
    object Test {
        const val junit = "junit:junit:4.13.2"
        const val androidxTestJunit = "androidx.test.ext:junit:1.1.5"
        const val espresso = "androidx.test.espresso:espresso-core:3.5.1"
    }
}
```

```gradle
// app/build.gradle
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'com.example.myapp'
    compileSdk Versions.compileSdk

    defaultConfig {
        applicationId "com.example.myapp"
        minSdk Versions.minSdk
        targetSdk Versions.targetSdk
        versionCode 1
        versionName "1.0"
    }
}

dependencies {
    implementation Dependencies.kotlinStdlib
    implementation Dependencies.androidxCore
    implementation Dependencies.androidxAppcompat
    
    implementation Dependencies.Network.retrofit
    implementation Dependencies.Network.retrofitGson
    
    testImplementation Dependencies.Test.junit
    androidTestImplementation Dependencies.Test.androidxTestJunit
    androidTestImplementation Dependencies.Test.espresso
}
```

#### Version Management Best Practices

**Use Version Catalogs (Gradle 7.0+):**
```toml
# gradle/libs.versions.toml
[versions]
kotlin = "1.9.10"
retrofit = "2.9.0"
room = "2.6.0"

[libraries]
kotlin-stdlib = { module = "org.jetbrains.kotlin:kotlin-stdlib", version.ref = "kotlin" }
retrofit-core = { module = "com.squareup.retrofit2:retrofit", version.ref = "retrofit" }
retrofit-gson = { module = "com.squareup.retrofit2:converter-gson", version.ref = "retrofit" }
room-runtime = { module = "androidx.room:room-runtime", version.ref = "room" }
room-compiler = { module = "androidx.room:room-compiler", version.ref = "room" }

[bundles]
retrofit = ["retrofit-core", "retrofit-gson"]
room = ["room-runtime"]

[plugins]
android-application = { id = "com.android.application", version = "8.1.2" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
```

```gradle
// build.gradle
dependencies {
    implementation libs.kotlin.stdlib
    implementation libs.bundles.retrofit
    implementation libs.bundles.room
    kapt libs.room.compiler
}
```

**Use BOMs for Version Alignment:**
```gradle
dependencies {
    // Use BOM to align versions
    implementation platform('androidx.compose:compose-bom:2023.10.01')
    implementation platform('com.squareup.okhttp3:okhttp-bom:4.12.0')
    
    // No need to specify versions
    implementation 'androidx.compose.ui:ui'
    implementation 'androidx.compose.material3:material3'
    implementation 'com.squareup.okhttp3:okhttp'
    implementation 'com.squareup.okhttp3:logging-interceptor'
}
```

#### Build Configuration Best Practices

**Environment-Specific Configuration:**
```gradle
android {
    buildTypes {
        debug {
            debuggable true
            applicationIdSuffix ".debug"
            versionNameSuffix "-DEBUG"
            
            // Debug-specific configuration
            buildConfigField "String", "API_BASE_URL", '"https://api-dev.example.com"'
            buildConfigField "boolean", "ENABLE_LOGGING", "true"
            
            // Debug signing
            signingConfig signingConfigs.debug
        }
        
        staging {
            initWith debug
            applicationIdSuffix ".staging"
            versionNameSuffix "-STAGING"
            
            buildConfigField "String", "API_BASE_URL", '"https://api-staging.example.com"'
            buildConfigField "boolean", "ENABLE_LOGGING", "true"
            
            // Enable minification for staging
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
        
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            
            buildConfigField "String", "API_BASE_URL", '"https://api.example.com"'
            buildConfigField "boolean", "ENABLE_LOGGING", "false"
            
            signingConfig signingConfigs.release
        }
    }
}
```

**Signing Configuration:**
```gradle
android {
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        
        release {
            // Use environment variables or gradle.properties
            storeFile file(project.hasProperty('RELEASE_STORE_FILE') ? RELEASE_STORE_FILE : 'release.keystore')
            storePassword project.hasProperty('RELEASE_STORE_PASSWORD') ? RELEASE_STORE_PASSWORD : ''
            keyAlias project.hasProperty('RELEASE_KEY_ALIAS') ? RELEASE_KEY_ALIAS : ''
            keyPassword project.hasProperty('RELEASE_KEY_PASSWORD') ? RELEASE_KEY_PASSWORD : ''
        }
    }
}
```

```properties
# gradle.properties (not committed to version control)
RELEASE_STORE_FILE=../release.keystore
RELEASE_STORE_PASSWORD=your_store_password
RELEASE_KEY_ALIAS=your_key_alias
RELEASE_KEY_PASSWORD=your_key_password
```

#### Performance Optimization Best Practices

**Gradle Configuration:**
```properties
# gradle.properties
# Enable Gradle daemon
org.gradle.daemon=true

# Enable parallel builds
org.gradle.parallel=true

# Enable configuration on demand
org.gradle.configureondemand=true

# Enable build cache
org.gradle.caching=true

# Optimize JVM settings
org.gradle.jvmargs=-Xmx4g -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:+HeapDumpOnOutOfMemoryError

# Android-specific optimizations
android.useAndroidX=true
android.enableJetifier=false
android.enableR8.fullMode=true
android.nonTransitiveRClass=true
android.nonFinalResIds=true
```

**Build Script Optimizations:**
```gradle
android {
    // Disable unused features
    buildFeatures {
        buildConfig true      // Only if needed
        resValues false      // Disable if not used
        shaders false        // Disable if not used
        aidl false          // Disable if not used
        renderScript false   // Disable if not used
    }
    
    // Optimize compilation
    compileOptions {
        incremental true
        sourceCompatibility JavaVersion.VERSION_11
        targetCompatibility JavaVersion.VERSION_11
    }
    
    // Optimize packaging
    packagingOptions {
        resources {
            excludes += [
                'META-INF/DEPENDENCIES',
                'META-INF/LICENSE',
                'META-INF/LICENSE.txt',
                'META-INF/NOTICE',
                'META-INF/NOTICE.txt'
            ]
        }
    }
}
```

#### Testing Best Practices

**Test Configuration:**
```gradle
android {
    testOptions {
        unitTests {
            includeAndroidResources = true
            returnDefaultValues = true
        }
        
        animationsDisabled = true
        
        execution 'ANDROIDX_TEST_ORCHESTRATOR'
    }
}

dependencies {
    // Unit testing
    testImplementation 'junit:junit:4.13.2'
    testImplementation 'org.mockito:mockito-core:5.6.0'
    testImplementation 'org.robolectric:robolectric:4.11.1'
    
    // Instrumented testing
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation 'androidx.test:runner:1.5.2'
    androidTestImplementation 'androidx.test:rules:1.5.0'
    
    // Test orchestrator
    androidTestUtil 'androidx.test:orchestrator:1.4.2'
}
```

**Custom Test Tasks:**
```gradle
task testAll {
    dependsOn 'testDebugUnitTest'
    dependsOn 'connectedDebugAndroidTest'
    dependsOn 'lintDebug'
    
    description 'Run all tests and checks'
    group 'verification'
}

task testCoverage(type: JacocoReport, dependsOn: 'testDebugUnitTest') {
    reports {
        xml.enabled = true
        html.enabled = true
    }
    
    def fileFilter = [
        '**/R.class',
        '**/R$*.class',
        '**/BuildConfig.*',
        '**/Manifest*.*',
        '**/*Test*.*',
        'android/**/*.*'
    ]
    
    def debugTree = fileTree(dir: "${buildDir}/intermediates/javac/debug", excludes: fileFilter)
    def mainSrc = "${project.projectDir}/src/main/java"
    
    sourceDirectories.setFrom(files([mainSrc]))
    classDirectories.setFrom(files([debugTree]))
    executionData.setFrom(fileTree(dir: "$buildDir", includes: ["**/*.exec", "**/*.ec"]))
}
```

### Comprehensive Troubleshooting Guide

This section provides a systematic approach to diagnosing and resolving Gradle build issues.

#### Systematic Troubleshooting Process

**Step 1: Identify the Problem**
1. **Read the error message carefully** - Gradle error messages are usually descriptive
2. **Note the build phase** - Configuration, compilation, or packaging
3. **Identify the affected module** - Root project, app module, or library module
4. **Check recent changes** - What was modified since the last successful build

**Step 2: Gather Information**
```bash
# Get detailed error information
./gradlew build --stacktrace --info

# Check Gradle and plugin versions
./gradlew --version
./gradlew buildEnvironment

# Verify project structure
./gradlew projects

# Check dependencies
./gradlew dependencies
```

**Step 3: Apply Systematic Solutions**

#### Quick Fixes Checklist

**Clean and Rebuild:**
```bash
# Clean build artifacts
./gradlew clean

# Clean build cache
./gradlew cleanBuildCache

# Rebuild project
./gradlew build --refresh-dependencies
```

**Gradle Daemon Issues:**
```bash
# Stop all daemons
./gradlew --stop

# Check daemon status
./gradlew --status

# Build without daemon
./gradlew build --no-daemon
```

**Cache and Dependency Issues:**
```bash
# Refresh dependencies
./gradlew build --refresh-dependencies

# Clear dependency cache
rm -rf ~/.gradle/caches/modules-2/

# Offline build (if network issues)
./gradlew build --offline
```

#### Advanced Troubleshooting Techniques

**Dependency Conflict Resolution:**
```gradle
// Force specific versions
configurations.all {
    resolutionStrategy {
        force 'com.google.code.gson:gson:2.10.1'
        
        eachDependency { details ->
            if (details.requested.group == 'org.jetbrains.kotlin') {
                details.useVersion '1.9.10'
            }
        }
    }
}

// Exclude problematic transitive dependencies
dependencies {
    implementation('com.example.library:library:1.0.0') {
        exclude group: 'com.google.guava', module: 'guava'
        exclude group: 'org.apache.httpcomponents'
    }
}
```

**Build Script Debugging:**
```gradle
// Add debugging output
println "Gradle version: ${gradle.gradleVersion}"
println "Android Gradle Plugin version: ${com.android.Version.ANDROID_GRADLE_PLUGIN_VERSION}"

android.applicationVariants.all { variant ->
    println "Processing variant: ${variant.name}"
    println "Application ID: ${variant.applicationId}"
    println "Version: ${variant.versionName} (${variant.versionCode})"
}

// Debug task execution
gradle.taskGraph.whenReady { taskGraph ->
    println "Tasks to execute: ${taskGraph.allTasks.collect { it.name }}"
}
```

**Memory and Performance Issues:**
```properties
# gradle.properties - Increase memory allocation
org.gradle.jvmargs=-Xmx8g -XX:MaxMetaspaceSize=1g -XX:+UseG1GC

# Enable performance optimizations
org.gradle.parallel=true
org.gradle.workers.max=8
org.gradle.caching=true
org.gradle.configureondemand=true
```

#### Common Error Patterns and Solutions

**Pattern: "Task X failed with an exception"**
```bash
# Get detailed stack trace
./gradlew X --stacktrace --debug

# Run specific task in isolation
./gradlew :module:taskName --info
```

**Pattern: "Could not resolve all files for configuration"**
```gradle
// Check repository configuration
repositories {
    google()
    mavenCentral()
    // Add missing repositories
    maven { url 'https://jitpack.io' }
}

// Check network connectivity and proxy settings
# gradle.properties
systemProp.http.proxyHost=proxy.company.com
systemProp.http.proxyPort=8080
systemProp.https.proxyHost=proxy.company.com
systemProp.https.proxyPort=8080
```

**Pattern: "Execution failed for task ':app:processXXXResources'"**
```gradle
android {
    // Resource processing options
    aaptOptions {
        noCompress 'txt', 'json'
        ignoreAssetsPattern "!.svn:!.git:.*:!CVS:!thumbs.db:!picasa.ini:!*.scc:*~"
    }
    
    // Packaging options
    packagingOptions {
        resources {
            excludes += ['META-INF/DEPENDENCIES', 'META-INF/LICENSE']
            pickFirsts += ['**/libc++_shared.so']
        }
    }
}
```

#### Emergency Recovery Procedures

**Complete Project Reset:**
```bash
# 1. Stop all Gradle processes
./gradlew --stop
pkill -f gradle

# 2. Clean all build artifacts
./gradlew clean
rm -rf build/
rm -rf app/build/
rm -rf */build/

# 3. Clear Gradle caches
rm -rf ~/.gradle/caches/
rm -rf .gradle/

# 4. Clear Android Studio caches
# File -> Invalidate Caches and Restart

# 5. Rebuild from scratch
./gradlew build --refresh-dependencies
```

**Gradle Wrapper Reset:**
```bash
# Delete existing wrapper
rm -rf gradle/
rm gradlew gradlew.bat

# Regenerate wrapper
gradle wrapper --gradle-version 8.4

# Or download manually
curl -L https://services.gradle.org/distributions/gradle-8.4-bin.zip -o gradle.zip
unzip gradle.zip
```

**Version Rollback Strategy:**
```gradle
// Temporarily downgrade to known working versions
buildscript {
    dependencies {
        classpath 'com.android.tools.build:gradle:7.4.2'  // Previous working version
    }
}

// gradle/wrapper/gradle-wrapper.properties
distributionUrl=https\://services.gradle.org/distributions/gradle-7.6-bin.zip
```

#### Prevention Strategies

**Proactive Monitoring:**
```gradle
// Add build health checks
task buildHealthCheck {
    doLast {
        // Check critical dependencies
        def criticalDeps = ['androidx.core:core-ktx', 'com.squareup.retrofit2:retrofit']
        configurations.implementation.resolvedConfiguration.resolvedArtifacts.each { artifact ->
            def id = "${artifact.moduleVersion.id.group}:${artifact.moduleVersion.id.name}"
            if (criticalDeps.contains(id)) {
                println "✓ Found critical dependency: $id:${artifact.moduleVersion.id.version}"
            }
        }
        
        // Check build environment
        println "Gradle version: ${gradle.gradleVersion}"
        println "Java version: ${System.getProperty('java.version')}"
        println "Available memory: ${Runtime.runtime.maxMemory() / 1024 / 1024} MB"
    }
}

// Run health check before builds
preBuild.dependsOn buildHealthCheck
```

**Automated Testing:**
```bash
#!/bin/bash
# build-test.sh - Automated build testing script

echo "Testing clean build..."
./gradlew clean build

echo "Testing incremental build..."
./gradlew build

echo "Testing with cache disabled..."
./gradlew build --no-build-cache

echo "Testing offline build..."
./gradlew build --offline

echo "All build tests completed successfully!"
```

> **💡 Tip:** Create a troubleshooting runbook specific to your project with common issues and their solutions. This saves time when issues occur repeatedly.

> **⚠️ Warning:** Always backup your project before applying major fixes or version upgrades. Use version control to track changes and enable easy rollbacks.

This comprehensive troubleshooting guide should help you resolve most Gradle build issues efficiently. Remember that systematic diagnosis and understanding the root cause is more effective than applying random fixes.

---

## 10. Reference Section

### Gradle DSL Reference

This comprehensive reference covers all essential Gradle DSL elements used in Android development.

#### Android Extension DSL

**Core Configuration:**

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `namespace` | String | App's namespace (replaces applicationId in manifest) | `namespace = "com.example.app"` |
| `compileSdk` | Integer | API level to compile against | `compileSdk = 34` |
| `buildToolsVersion` | String | Build tools version (optional) | `buildToolsVersion = "34.0.0"` |
| `ndkVersion` | String | NDK version for native code | `ndkVersion = "25.2.9519653"` |

**Default Configuration:**

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `applicationId` | String | Unique app identifier | `applicationId = "com.example.app"` |
| `minSdk` | Integer | Minimum supported API level | `minSdk = 24` |
| `targetSdk` | Integer | Target API level | `targetSdk = 34` |
| `versionCode` | Integer | Internal version number | `versionCode = 1` |
| `versionName` | String | User-visible version | `versionName = "1.0.0"` |
| `testInstrumentationRunner` | String | Test runner class | `testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"` |
| `multiDexEnabled` | Boolean | Enable MultiDex support | `multiDexEnabled = true` |

**Build Types Configuration:**

```gradle
buildTypes {
    debug {
        debuggable true                    // Enable debugging
        minifyEnabled false               // Disable code shrinking
        shrinkResources false             // Disable resource shrinking
        applicationIdSuffix ".debug"      // Add suffix to app ID
        versionNameSuffix "-DEBUG"        // Add suffix to version name
        signingConfig signingConfigs.debug // Signing configuration
        manifestPlaceholders = [          // Manifest placeholders
            appName: "App Debug"
        ]
        buildConfigField "String", "API_URL", '"https://api-dev.example.com"'
        resValue "string", "app_name", "App Debug"
    }
    
    release {
        minifyEnabled true                // Enable code shrinking
        shrinkResources true              // Enable resource shrinking
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        signingConfig signingConfigs.release
        manifestPlaceholders = [
            appName: "App"
        ]
        buildConfigField "String", "API_URL", '"https://api.example.com"'
        resValue "string", "app_name", "App"
    }
}
```

**Product Flavors Configuration:**

```gradle
flavorDimensions "version", "environment"

productFlavors {
    free {
        dimension "version"
        applicationIdSuffix ".free"
        versionNameSuffix "-free"
        manifestPlaceholders = [adMobAppId: "ca-app-pub-free"]
    }
    
    paid {
        dimension "version"
        applicationIdSuffix ".paid"
        versionNameSuffix "-paid"
        manifestPlaceholders = [adMobAppId: "ca-app-pub-paid"]
    }
    
    dev {
        dimension "environment"
        applicationIdSuffix ".dev"
        buildConfigField "String", "BASE_URL", '"https://dev-api.example.com"'
    }
    
    prod {
        dimension "environment"
        buildConfigField "String", "BASE_URL", '"https://api.example.com"'
    }
}
```

**Compile Options:**

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `sourceCompatibility` | JavaVersion | Java source compatibility | `sourceCompatibility = JavaVersion.VERSION_11` |
| `targetCompatibility` | JavaVersion | Java target compatibility | `targetCompatibility = JavaVersion.VERSION_11` |
| `encoding` | String | Source file encoding | `encoding = "UTF-8"` |
| `incremental` | Boolean | Enable incremental compilation | `incremental = true` |

**Kotlin Options:**

```gradle
kotlinOptions {
    jvmTarget = "11"                     // JVM target version
    languageVersion = "1.9"             // Kotlin language version
    apiVersion = "1.9"                  // Kotlin API version
    suppressWarnings = false            // Suppress warnings
    verbose = true                      // Verbose output
    freeCompilerArgs += [               // Additional compiler arguments
        "-opt-in=kotlin.RequiresOptIn",
        "-Xjvm-default=all"
    ]
}
```

**Packaging Options:**

```gradle
packagingOptions {
    resources {
        excludes += [                   // Exclude files from APK
            'META-INF/DEPENDENCIES',
            'META-INF/LICENSE',
            'META-INF/LICENSE.txt',
            'META-INF/NOTICE',
            'META-INF/NOTICE.txt'
        ]
        pickFirsts += [                 // Pick first occurrence
            '**/libc++_shared.so',
            '**/libnative.so'
        ]
        merges += [                     // Merge files
            'META-INF/services/**'
        ]
    }
    
    jniLibs {
        useLegacyPackaging = true       // Use legacy JNI packaging
    }
}
```

**Lint Options:**

```gradle
lintOptions {
    abortOnError false                  // Don't abort on lint errors
    checkReleaseBuilds false            // Skip lint for release builds
    disable 'InvalidPackage', 'MissingTranslation'
    enable 'RtlHardcoded', 'RtlCompat', 'RtlEnabled'
    checkDependencies true              // Check dependencies
    xmlReport true                      // Generate XML report
    htmlReport true                     // Generate HTML report
    xmlOutput file("$project.buildDir/reports/lint/lint.xml")
    htmlOutput file("$project.buildDir/reports/lint/lint.html")
}
```

**Test Options:**

```gradle
testOptions {
    unitTests {
        includeAndroidResources = true  // Include Android resources in unit tests
        returnDefaultValues = true      // Return default values for Android API calls
        all {
            jvmArgs '-noverify'         // JVM arguments for tests
            testLogging {
                events "passed", "skipped", "failed"
                exceptionFormat "full"
            }
        }
    }
    
    animationsDisabled = true           // Disable animations during testing
    execution = 'ANDROIDX_TEST_ORCHESTRATOR'  // Use test orchestrator
}
```

#### Dependencies DSL

**Configuration Types:**

| Configuration | Scope | Description | Use Case |
|---------------|-------|-------------|----------|
| `implementation` | Compile + Runtime | Private dependency | Most common dependencies |
| `api` | Compile + Runtime + Consumers | Public dependency | Library modules exposing APIs |
| `compileOnly` | Compile only | Compile-time only | Annotations, provided libraries |
| `runtimeOnly` | Runtime only | Runtime-only dependency | Database drivers, logging implementations |
| `testImplementation` | Test compile + runtime | Unit test dependencies | JUnit, Mockito |
| `androidTestImplementation` | Android test | Instrumented test dependencies | Espresso, UI testing |
| `debugImplementation` | Debug builds only | Debug-specific dependencies | Debug tools, leak detection |
| `releaseImplementation` | Release builds only | Release-specific dependencies | Crash reporting |

**Dependency Declaration Formats:**

```gradle
dependencies {
    // Standard format
    implementation 'group:artifact:version'
    implementation 'androidx.core:core-ktx:1.12.0'
    
    // Map format
    implementation group: 'androidx.core', name: 'core-ktx', version: '1.12.0'
    
    // Version catalog (recommended)
    implementation libs.androidx.core.ktx
    
    // Project dependencies
    implementation project(':core')
    implementation project(path: ':feature-login')
    
    // File dependencies
    implementation files('libs/custom-library.jar')
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    
    // Platform/BOM dependencies
    implementation platform('com.google.firebase:firebase-bom:32.7.0')
    implementation 'com.google.firebase:firebase-analytics'  // Version from BOM
    
    // Dependency with exclusions
    implementation('com.example.library:library:1.0.0') {
        exclude group: 'com.google.guava', module: 'guava'
        exclude module: 'commons-logging'
    }
    
    // Dependency with classifier
    implementation 'org.apache.httpcomponents:httpclient:4.5.14:android'
    
    // Dependency with changing version
    implementation 'com.example:snapshot-lib:1.0-SNAPSHOT'
    implementation('com.example:snapshot-lib:1.0-SNAPSHOT') {
        changing = true
    }
}
```

**Version Constraints:**

```gradle
dependencies {
    // Strict version
    implementation 'com.example:library:1.0.0!!'
    
    // Version range
    implementation 'com.example:library:[1.0, 2.0)'
    
    // Latest version
    implementation 'com.example:library:+'
    implementation 'com.example:library:1.+'
    
    // Prefer version
    implementation('com.example:library') {
        version {
            prefer '1.0.0'
            reject '1.0.1'
        }
    }
}
```

#### Task DSL

**Task Declaration:**

```gradle
// Simple task
task myTask {
    doLast {
        println "Executing myTask"
    }
}

// Typed task
task copyFiles(type: Copy) {
    from 'src'
    into 'dest'
}

// Task with configuration
task customTask {
    description = 'Custom task description'
    group = 'custom'
    
    inputs.files('input.txt')
    outputs.files('output.txt')
    
    doFirst {
        println "Starting task"
    }
    
    doLast {
        println "Task completed"
    }
}

// Task dependencies
task taskA {
    doLast { println "Task A" }
}

task taskB(dependsOn: taskA) {
    doLast { println "Task B" }
}

task taskC {
    dependsOn taskA, taskB
    doLast { println "Task C" }
}
```

**Task Configuration:**

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `description` | String | Task description | `description = "Builds the app"` |
| `group` | String | Task group | `group = "build"` |
| `enabled` | Boolean | Enable/disable task | `enabled = false` |
| `onlyIf` | Closure | Conditional execution | `onlyIf { project.hasProperty('runTask') }` |
| `inputs` | TaskInputs | Task inputs | `inputs.files('src/**/*.java')` |
| `outputs` | TaskOutputs | Task outputs | `outputs.files('build/output.jar')` |
| `dependsOn` | Object[] | Task dependencies | `dependsOn 'compileJava', 'processResources'` |
| `finalizedBy` | Object[] | Finalization tasks | `finalizedBy 'cleanup'` |
| `mustRunAfter` | Object[] | Ordering constraint | `mustRunAfter 'compileJava'` |
| `shouldRunAfter` | Object[] | Soft ordering | `shouldRunAfter 'test'` |

### Quick Reference Tables

#### Common Gradle Commands

| Command | Description | Example |
|---------|-------------|---------|
| `./gradlew tasks` | List available tasks | `./gradlew tasks --group=build` |
| `./gradlew build` | Build the project | `./gradlew build --parallel` |
| `./gradlew clean` | Clean build artifacts | `./gradlew clean build` |
| `./gradlew assemble` | Build all variants | `./gradlew assembleDebug` |
| `./gradlew test` | Run unit tests | `./gradlew testDebugUnitTest` |
| `./gradlew check` | Run all checks | `./gradlew check --continue` |
| `./gradlew install` | Install APK | `./gradlew installDebug` |
| `./gradlew dependencies` | Show dependencies | `./gradlew :app:dependencies` |
| `./gradlew projects` | List projects | `./gradlew projects` |
| `./gradlew properties` | Show properties | `./gradlew properties` |

#### Android Build Variants

| Build Type | Product Flavor | Resulting Variant | APK Name |
|------------|----------------|-------------------|----------|
| debug | free | freeDebug | app-free-debug.apk |
| debug | paid | paidDebug | app-paid-debug.apk |
| release | free | freeRelease | app-free-release.apk |
| release | paid | paidRelease | app-paid-release.apk |

#### Dependency Configurations Comparison

| Configuration | Compile Time | Runtime | Exposed to Consumers | Test Classpath |
|---------------|--------------|---------|---------------------|----------------|
| `implementation` | ✓ | ✓ | ✗ | ✓ |
| `api` | ✓ | ✓ | ✓ | ✓ |
| `compileOnly` | ✓ | ✗ | ✗ | ✗ |
| `runtimeOnly` | ✗ | ✓ | ✗ | ✓ |
| `testImplementation` | ✗ | ✗ | ✗ | ✓ |
| `androidTestImplementation` | ✗ | ✗ | ✗ | ✓ (instrumented) |

#### Gradle Properties Reference

| Property | Default | Description | Example |
|----------|---------|-------------|---------|
| `org.gradle.jvmargs` | `-Xmx1g` | JVM arguments | `-Xmx4g -XX:+UseG1GC` |
| `org.gradle.parallel` | `false` | Enable parallel builds | `true` |
| `org.gradle.workers.max` | CPU cores | Max worker processes | `8` |
| `org.gradle.caching` | `false` | Enable build cache | `true` |
| `org.gradle.configureondemand` | `false` | Configure on demand | `true` |
| `org.gradle.daemon` | `true` | Use Gradle daemon | `false` |
| `org.gradle.logging.level` | `lifecycle` | Logging level | `info`, `debug` |

#### Android Gradle Plugin Versions

| AGP Version | Gradle Version | Java Version | Kotlin Version |
|-------------|----------------|--------------|----------------|
| 8.2.x | 8.2+ | 17+ | 1.9.10+ |
| 8.1.x | 8.0+ | 17+ | 1.8.20+ |
| 8.0.x | 8.0+ | 17+ | 1.8.10+ |
| 7.4.x | 7.5+ | 11+ | 1.7.10+ |
| 7.3.x | 7.4+ | 11+ | 1.7.10+ |
| 7.2.x | 7.3.3+ | 11+ | 1.6.21+ |

### Cheat Sheets

#### Essential Build.gradle Template

```gradle
// Module-level build.gradle (app)
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
    id 'kotlin-kapt'
    id 'dagger.hilt.android.plugin'
}

android {
    namespace 'com.example.app'
    compileSdk 34

    defaultConfig {
        applicationId "com.example.app"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
        
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        
        // ProGuard consumer rules
        consumerProguardFiles "consumer-rules.pro"
        
        // Build config fields
        buildConfigField "String", "API_BASE_URL", '"https://api.example.com"'
        
        // Manifest placeholders
        manifestPlaceholders = [
            appName: "@string/app_name"
        ]
    }

    buildTypes {
        debug {
            debuggable true
            minifyEnabled false
            applicationIdSuffix ".debug"
            versionNameSuffix "-DEBUG"
        }
        
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
        }
    }
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_11
        targetCompatibility JavaVersion.VERSION_11
    }
    
    kotlinOptions {
        jvmTarget = '11'
        freeCompilerArgs += [
            "-opt-in=kotlin.RequiresOptIn"
        ]
    }
    
    buildFeatures {
        viewBinding true
        dataBinding true
        compose true
    }
    
    composeOptions {
        kotlinCompilerExtensionVersion '1.5.4'
    }
    
    packagingOptions {
        resources {
            excludes += [
                'META-INF/DEPENDENCIES',
                'META-INF/LICENSE',
                'META-INF/LICENSE.txt',
                'META-INF/NOTICE',
                'META-INF/NOTICE.txt'
            ]
        }
    }
    
    testOptions {
        unitTests {
            includeAndroidResources = true
            returnDefaultValues = true
        }
        animationsDisabled = true
    }
}

dependencies {
    // Core Android
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.10.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    
    // Architecture Components
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-livedata-ktx:2.7.0'
    implementation 'androidx.navigation:navigation-fragment-ktx:2.7.5'
    implementation 'androidx.navigation:navigation-ui-ktx:2.7.5'
    
    // Dependency Injection
    implementation 'com.google.dagger:hilt-android:2.48'
    kapt 'com.google.dagger:hilt-compiler:2.48'
    
    // Network
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.12.0'
    
    // Testing
    testImplementation 'junit:junit:4.13.2'
    testImplementation 'org.mockito:mockito-core:5.7.0'
    testImplementation 'androidx.arch.core:core-testing:2.2.0'
    
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation 'androidx.test:runner:1.5.2'
    androidTestImplementation 'androidx.test:rules:1.5.0'
}
```

#### Common Task Patterns

```gradle
// Custom APK naming
android.applicationVariants.all { variant ->
    variant.outputs.all {
        def appName = "MyApp"
        def versionName = variant.versionName
        def buildType = variant.buildType.name
        def flavorName = variant.flavorName
        
        outputFileName = "${appName}-${flavorName}-${buildType}-${versionName}.apk"
    }
}

// Generate build info
task generateBuildConfig {
    def outputDir = file("$buildDir/generated/source/buildConfig")
    outputs.dir outputDir
    
    doLast {
        def buildConfigFile = file("$outputDir/BuildConfig.java")
        buildConfigFile.parentFile.mkdirs()
        buildConfigFile.text = """
package ${android.defaultConfig.applicationId};

public final class BuildConfig {
    public static final String BUILD_TIME = "${new Date()}";
    public static final String GIT_COMMIT = "${getGitCommit()}";
    public static final boolean DEBUG = ${android.buildTypes.debug.debuggable};
}
"""
    }
}

def getGitCommit() {
    try {
        return 'git rev-parse --short HEAD'.execute().text.trim()
    } catch (Exception e) {
        return 'unknown'
    }
}

// Copy assets based on build variant
android.applicationVariants.all { variant ->
    def copyAssetsTask = task("copy${variant.name.capitalize()}Assets", type: Copy) {
        from "src/${variant.flavorName}/assets"
        into "src/main/assets"
    }
    
    variant.preBuildProvider.configure {
        dependsOn copyAssetsTask
    }
}

// Custom lint task
task lintAll {
    dependsOn 'lintDebug', 'lintRelease'
    description 'Run lint for all variants'
    group 'verification'
}

// Test coverage report
task jacocoTestReport(type: JacocoReport, dependsOn: ['testDebugUnitTest']) {
    reports {
        xml.enabled = true
        html.enabled = true
    }
    
    def fileFilter = [
        '**/R.class', '**/R$*.class', '**/BuildConfig.*', '**/Manifest*.*',
        '**/*Test*.*', 'android/**/*.*'
    ]
    
    def debugTree = fileTree(dir: "${buildDir}/intermediates/javac/debug/classes", excludes: fileFilter)
    def mainSrc = "${project.projectDir}/src/main/java"
    
    sourceDirectories.setFrom(files([mainSrc]))
    classDirectories.setFrom(files([debugTree]))
    executionData.setFrom(fileTree(dir: "$buildDir", includes: ["**/*.exec", "**/*.ec"]))
}
```

#### ProGuard/R8 Rules Cheat Sheet

```proguard
# Basic rules for common libraries

# Retrofit
-dontwarn retrofit2.**
-keep class retrofit2.** { *; }
-keepattributes Signature
-keepattributes Exceptions

# Gson
-keepattributes Signature
-keepattributes *Annotation*
-dontwarn sun.misc.**
-keep class com.google.gson.examples.android.model.** { <fields>; }
-keep class * implements com.google.gson.TypeAdapter
-keep class * implements com.google.gson.TypeAdapterFactory
-keep class * implements com.google.gson.JsonSerializer
-keep class * implements com.google.gson.JsonDeserializer

# OkHttp
-dontwarn okhttp3.**
-dontwarn okio.**
-dontwarn javax.annotation.**
-keepnames class okhttp3.internal.publicsuffix.PublicSuffixDatabase

# Glide
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep class * extends com.bumptech.glide.module.AppGlideModule {
 <init>(...);
}
-keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
  **[] $VALUES;
  public *;
}

# Room
-keep class * extends androidx.room.RoomDatabase
-dontwarn androidx.room.paging.**

# Keep data classes
-keep class com.yourpackage.model.** { *; }

# Keep Parcelable implementations
-keep class * implements android.os.Parcelable {
  public static final android.os.Parcelable$Creator *;
}

# Keep enum classes
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}
```

### Version Compatibility Guide

#### Android Gradle Plugin Compatibility Matrix

| Android Gradle Plugin | Required Gradle Version | Required JDK Version | Supported Kotlin Version |
|----------------------|------------------------|---------------------|-------------------------|
| 8.3.x | 8.4+ | 17+ | 1.9.20+ |
| 8.2.x | 8.2+ | 17+ | 1.9.10+ |
| 8.1.x | 8.0+ | 17+ | 1.8.20+ |
| 8.0.x | 8.0+ | 17+ | 1.8.10+ |
| 7.4.x | 7.5+ | 11+ | 1.7.10+ |
| 7.3.x | 7.4+ | 11+ | 1.7.10+ |
| 7.2.x | 7.3.3+ | 11+ | 1.6.21+ |
| 7.1.x | 7.2+ | 11+ | 1.6.10+ |
| 7.0.x | 7.0+ | 11+ | 1.5.21+ |

#### Kotlin Compatibility

| Kotlin Version | Android Gradle Plugin | Compose Compiler | Coroutines Version |
|----------------|----------------------|------------------|-------------------|
| 1.9.20 | 8.2.0+ | 1.5.5+ | 1.7.3+ |
| 1.9.10 | 8.1.0+ | 1.5.4+ | 1.7.3+ |
| 1.9.0 | 8.1.0+ | 1.5.1+ | 1.7.1+ |
| 1.8.22 | 8.0.0+ | 1.4.8+ | 1.7.1+ |
| 1.8.20 | 8.0.0+ | 1.4.6+ | 1.6.4+ |
| 1.8.10 | 7.4.0+ | 1.4.3+ | 1.6.4+ |

#### AndroidX Library Versions

| Library Group | Latest Stable | Min API | Compile SDK |
|---------------|---------------|---------|-------------|
| Core KTX | 1.12.0 | 14 | 34 |
| AppCompat | 1.6.1 | 14 | 34 |
| Fragment | 1.6.2 | 14 | 34 |
| Activity | 1.8.2 | 14 | 34 |
| Lifecycle | 2.7.0 | 14 | 34 |
| Navigation | 2.7.5 | 14 | 34 |
| Room | 2.6.1 | 14 | 34 |
| WorkManager | 2.9.0 | 14 | 34 |
| Compose BOM | 2023.10.01 | 21 | 34 |

#### Build Tools Compatibility

| Build Tools Version | Minimum Gradle | Minimum AGP | Target SDK |
|--------------------|----------------|-------------|------------|
| 34.0.0 | 8.0 | 8.0.0 | 34 |
| 33.0.2 | 7.4 | 7.4.0 | 33 |
| 33.0.1 | 7.2 | 7.2.0 | 33 |
| 32.0.0 | 7.0 | 7.0.0 | 32 |
| 31.0.0 | 6.7.1 | 4.2.0 | 31 |
| 30.0.3 | 6.1.1 | 4.0.0 | 30 |

### Migration Guides

#### Migrating from AGP 7.x to 8.x

**1. Update Gradle and Plugin Versions:**

```gradle
// Before (AGP 7.4.x)
buildscript {
    dependencies {
        classpath 'com.android.tools.build:gradle:7.4.2'
    }
}

// gradle/wrapper/gradle-wrapper.properties
distributionUrl=https\://services.gradle.org/distributions/gradle-7.6-bin.zip
```

```gradle
// After (AGP 8.x)
plugins {
    id 'com.android.application' version '8.2.0' apply false
}

// gradle/wrapper/gradle-wrapper.properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.4-bin.zip
```

**2. Update Namespace Declaration:**

```gradle
// Before
android {
    compileSdk 34
    
    defaultConfig {
        applicationId "com.example.app"
        // ...
    }
}
```

```gradle
// After
android {
    namespace 'com.example.app'  // Add this line
    compileSdk 34
    
    defaultConfig {
        applicationId "com.example.app"  // Keep for APK ID
        // ...
    }
}
```

**3. Update Java/JDK Version:**

```gradle
// Before (Java 11)
compileOptions {
    sourceCompatibility JavaVersion.VERSION_11
    targetCompatibility JavaVersion.VERSION_11
}

kotlinOptions {
    jvmTarget = '11'
}
```

```gradle
// After (Java 17 required for AGP 8.x)
compileOptions {
    sourceCompatibility JavaVersion.VERSION_17
    targetCompatibility JavaVersion.VERSION_17
}

kotlinOptions {
    jvmTarget = '17'
}
```

**4. Update Packaging Options:**

```gradle
// Before
packagingOptions {
    exclude 'META-INF/DEPENDENCIES'
    pickFirst '**/libc++_shared.so'
    merge 'META-INF/services/**'
}
```

```gradle
// After
packagingOptions {
    resources {
        excludes += ['META-INF/DEPENDENCIES']
        pickFirsts += ['**/libc++_shared.so']
        merges += ['META-INF/services/**']
    }
}
```

**5. Update Lint Configuration:**

```gradle
// Before
lintOptions {
    abortOnError false
    disable 'InvalidPackage'
}
```

```gradle
// After
lint {
    abortOnError false
    disable 'InvalidPackage'
}
```

#### Migrating to Version Catalogs

**1. Create `gradle/libs.versions.toml`:**

```toml
[versions]
kotlin = "1.9.20"
compose-bom = "2023.10.01"
androidx-core = "1.12.0"
androidx-lifecycle = "2.7.0"
retrofit = "2.9.0"
hilt = "2.48"

[libraries]
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "androidx-core" }
androidx-lifecycle-viewmodel = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-ktx", version.ref = "androidx-lifecycle" }
androidx-lifecycle-livedata = { group = "androidx.lifecycle", name = "lifecycle-livedata-ktx", version.ref = "androidx-lifecycle" }

compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "compose-bom" }
compose-ui = { group = "androidx.compose.ui", name = "ui" }
compose-material3 = { group = "androidx.compose.material3", name = "material3" }

retrofit-core = { group = "com.squareup.retrofit2", name = "retrofit", version.ref = "retrofit" }
retrofit-gson = { group = "com.squareup.retrofit2", name = "converter-gson", version.ref = "retrofit" }

hilt-android = { group = "com.google.dagger", name = "hilt-android", version.ref = "hilt" }
hilt-compiler = { group = "com.google.dagger", name = "hilt-compiler", version.ref = "hilt" }

junit = { group = "junit", name = "junit", version = "4.13.2" }
androidx-test-ext-junit = { group = "androidx.test.ext", name = "junit", version = "1.1.5" }

[bundles]
lifecycle = ["androidx-lifecycle-viewmodel", "androidx-lifecycle-livedata"]
retrofit = ["retrofit-core", "retrofit-gson"]
compose = ["compose-ui", "compose-material3"]

[plugins]
android-application = { id = "com.android.application", version = "8.2.0" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
hilt = { id = "com.google.dagger.hilt.android", version.ref = "hilt" }
```

**2. Update build.gradle files:**

```gradle
// Before
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
    id 'dagger.hilt.android.plugin'
}

dependencies {
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-livedata-ktx:2.7.0'
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
}
```

```gradle
// After
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.hilt)
}

dependencies {
    implementation libs.androidx.core.ktx
    implementation libs.bundles.lifecycle
    implementation libs.bundles.retrofit
    
    // Or individual libraries
    implementation libs.androidx.core.ktx
    implementation libs.retrofit.core
    implementation libs.retrofit.gson
}
```

#### Migrating from Groovy to Kotlin DSL

**1. Rename Files:**
- `build.gradle` → `build.gradle.kts`
- `settings.gradle` → `settings.gradle.kts`

**2. Update Syntax:**

```gradle
// Groovy DSL
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    compileSdk 34
    
    defaultConfig {
        applicationId "com.example.app"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0"
    }
    
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation 'androidx.core:core-ktx:1.12.0'
    testImplementation 'junit:junit:4.13.2'
}
```

```kotlin
// Kotlin DSL
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    compileSdk = 34
    
    defaultConfig {
        applicationId = "com.example.app"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
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
}

dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    testImplementation("junit:junit:4.13.2")
}
```

**3. Key Syntax Changes:**

| Groovy DSL | Kotlin DSL |
|------------|------------|
| `minifyEnabled false` | `isMinifyEnabled = false` |
| `debuggable true` | `isDebuggable = true` |
| `multiDexEnabled true` | `isMultiDexEnabled = true` |
| `testInstrumentationRunner "..."` | `testInstrumentationRunner = "..."` |
| `proguardFiles getDefaultProguardFile('...'), '...'` | `proguardFiles(getDefaultProguardFile("..."), "...")` |
| `implementation 'group:artifact:version'` | `implementation("group:artifact:version")` |

#### Common Migration Issues and Solutions

**Issue 1: Namespace conflicts after AGP 8.x migration**

```gradle
// Solution: Ensure namespace matches package structure
android {
    namespace = "com.example.app"  // Must match your package structure
}
```

**Issue 2: Build failures with Java 17**

```bash
# Solution: Update JAVA_HOME and Gradle JVM
export JAVA_HOME=/path/to/java17
./gradlew build

# Or in gradle.properties
org.gradle.java.home=/path/to/java17
```

**Issue 3: Kotlin DSL unresolved references**

```kotlin
// Solution: Use explicit imports and type-safe accessors
import com.android.build.gradle.internal.cxx.configure.gradleLocalProperties

val localProperties = gradleLocalProperties(rootDir)
val apiKey: String = localProperties.getProperty("API_KEY") ?: ""
```

**Issue 4: Version catalog not recognized**

```gradle
// Solution: Ensure proper file structure and syntax
// gradle/libs.versions.toml must be in correct location
// Use 'libs' prefix in build scripts
implementation(libs.androidx.core.ktx)
```

> **💡 Tip:** Always test migrations in a separate branch and run comprehensive tests before merging to main branch.

> **⚠️ Warning:** Major version migrations may require updating CI/CD configurations, Docker images, and development environment setups.

This comprehensive Reference section provides quick access to all essential Gradle DSL elements, commands, and migration information needed for Android development. Use it as a quick lookup while working on your projects.

---

## Comprehensive Index

### A-C
- **AGP (Android Gradle Plugin)** - [Section 3](#3-android-specific-gradle-configuration)
- **API Dependencies** - [Dependencies Section](#dependencies-and-repositories)
- **APK Generation** - [Build Types](#build-types-and-product-flavors)
- **Build Cache** - [Performance Optimization](#7-performance-optimization)
- **Build Scripts** - [Basic Concepts](#2-basic-gradle-concepts)
- **Build Types** - [Android Configuration](#3-android-specific-gradle-configuration)
- **Build Variants** - [Intermediate Topics](#4-intermediate-topics)
- **Composite Builds** - [Advanced Topics](#5-advanced-topics)
- **Custom Plugins** - [Advanced Topics](#5-advanced-topics)
- **Custom Tasks** - [Intermediate Topics](#4-intermediate-topics)

### D-G
- **Dependencies** - [Basic Concepts](#2-basic-gradle-concepts)
- **DSL (Domain Specific Language)** - [Basic Concepts](#2-basic-gradle-concepts)
- **Flutter Integration** - [Cross-Platform](#8-cross-platform-integration)
- **Gradle Properties** - [Advanced Topics](#5-advanced-topics)
- **Gradle Wrapper** - [Basic Concepts](#2-basic-gradle-concepts)

### H-M
- **Installation** - [Introduction](#1-introduction--fundamentals)
- **Kotlin DSL** - [Build Scripts](#build-scripts-and-dsl)
- **Multi-Module Projects** - [Intermediate Topics](#4-intermediate-topics)
- **Manifest Merging** - [Android Configuration](#3-android-specific-gradle-configuration)

### N-R
- **Performance Optimization** - [Section 7](#7-performance-optimization)
- **Product Flavors** - [Android Configuration](#3-android-specific-gradle-configuration)
- **ProGuard/R8** - [Android Configuration](#3-android-specific-gradle-configuration)
- **React Native** - [Cross-Platform](#8-cross-platform-integration)
- **Repositories** - [Basic Concepts](#2-basic-gradle-concepts)

### S-Z
- **Signing** - [Intermediate Topics](#4-intermediate-topics)
- **Testing Configuration** - [Intermediate Topics](#4-intermediate-topics)
- **Troubleshooting** - [Section 9](#9-troubleshooting--best-practices)
- **Version Catalogs** - [Reference Section](#10-reference-section)

---

## Quick Reference Commands

### Essential Gradle Commands
```bash
# Build project
./gradlew build

# Clean build
./gradlew clean

# Assemble debug APK
./gradlew assembleDebug

# Run tests
./gradlew test

# Check dependencies
./gradlew dependencies

# List tasks
./gradlew tasks

# Build performance report
./gradlew build --profile
```

### Android-Specific Commands
```bash
# Install debug APK
./gradlew installDebug

# Run instrumented tests
./gradlew connectedAndroidTest

# Generate lint report
./gradlew lint

# Bundle release AAB
./gradlew bundleRelease

# Check for dependency updates
./gradlew dependencyUpdates
```

---

## Summary and Next Steps

This comprehensive tutorial has covered Gradle for Android development from beginner to expert level:

### What You've Learned
- ✅ **Fundamentals**: Gradle basics, installation, and core concepts
- ✅ **Android Integration**: AGP, build types, flavors, and configurations
- ✅ **Intermediate Skills**: Multi-module projects, custom tasks, testing
- ✅ **Advanced Techniques**: Custom plugins, scripting, composite builds
- ✅ **Expert Level**: Performance optimization, CI/CD integration
- ✅ **Cross-Platform**: Flutter and React Native integration
- ✅ **Troubleshooting**: Common issues and best practices
- ✅ **Reference**: Complete DSL reference and migration guides

### Recommended Learning Path
1. **Start with Section 1-2** if you're new to Gradle
2. **Focus on Section 3-4** for practical Android development
3. **Advance to Section 5-6** for complex project requirements
4. **Use Section 7-8** for performance and cross-platform needs
5. **Reference Section 9-10** for troubleshooting and quick lookup

### Best Practices Checklist
- [ ] Always use Gradle Wrapper (`./gradlew`)
- [ ] Keep Gradle and AGP versions up to date
- [ ] Use version catalogs for dependency management
- [ ] Enable build caching and parallel execution
- [ ] Implement proper signing configurations
- [ ] Set up comprehensive testing strategies
- [ ] Monitor build performance regularly
- [ ] Follow security best practices
- [ ] Document custom build logic
- [ ] Use CI/CD for automated builds

### Additional Resources
- **Official Documentation**: [gradle.org](https://gradle.org)
- **Android Gradle Plugin**: [developer.android.com](https://developer.android.com/studio/build)
- **Gradle Community**: [gradle.org/community](https://gradle.org/community)
- **Performance Guide**: [gradle.org/performance](https://gradle.org/performance)

---

## About This Tutorial

This comprehensive Gradle tutorial is designed to take you from beginner to expert level in Android Gradle development. Each section builds upon the previous one, providing practical examples and real-world scenarios.

**Tutorial Statistics:**
- **Sections**: 10 major sections
- **Subsections**: 40+ detailed topics
- **Code Examples**: 100+ practical examples
- **Coverage**: Beginner to Expert level

**Last Updated:** December 2024  
**Gradle Version**: 8.4+  
**Android Gradle Plugin Version**: 8.2+  
**Target Android API**: 34

**Requirements Coverage:**
- ✅ Beginner-friendly explanations and examples
- ✅ Intermediate build optimization and multi-module support
- ✅ Expert-level custom plugins and advanced techniques
- ✅ Comprehensive reference and troubleshooting guide
- ✅ Cross-platform integration (Flutter/React Native)

---

*© 2024 - Complete Gradle Tutorial for Android Development*
