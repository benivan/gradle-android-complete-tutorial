'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import ContentSection from '@/components/ContentSection'
import CodeBlock from '@/components/CodeBlock'

const sections = [
  {
    id: '1',
    title: '1. Introduction & Fundamentals',
    subsections: [
      { id: '1-1', title: 'What is Gradle?' },
      { id: '1-2', title: 'Gradle vs Other Build Systems' },
      { id: '1-3', title: 'Installation and Setup' },
      { id: '1-4', title: 'Essential Terminology' }
    ]
  },
  {
    id: '2',
    title: '2. Basic Gradle Concepts',
    subsections: [
      { id: '2-1', title: 'Build Scripts and DSL' },
      { id: '2-2', title: 'Projects and Tasks' },
      { id: '2-3', title: 'Dependencies and Repositories' },
      { id: '2-4', title: 'Gradle Wrapper' }
    ]
  },
  {
    id: '3',
    title: '3. Android-Specific Configuration',
    subsections: [
      { id: '3-1', title: 'Android Gradle Plugin' },
      { id: '3-2', title: 'Build Types and Product Flavors' },
      { id: '3-3', title: 'Manifest Merging' },
      { id: '3-4', title: 'Resource Processing' }
    ]
  },
  {
    id: '4',
    title: '4. Intermediate Topics',
    subsections: [
      { id: '4-1', title: 'Multi-Module Projects' },
      { id: '4-2', title: 'Custom Tasks and Plugins' },
      { id: '4-3', title: 'Build Variants and Configurations' },
      { id: '4-4', title: 'Testing Configuration' }
    ]
  },
  {
    id: '5',
    title: '5. Advanced Topics',
    subsections: [
      { id: '5-1', title: 'Custom Plugin Development' },
      { id: '5-2', title: 'Advanced Scripting Techniques' },
      { id: '5-3', title: 'Build Logic Organization' },
      { id: '5-4', title: 'Composite Builds' }
    ]
  }
]

export default function BlogPost() {
  const [activeSection, setActiveSection] = useState('1')

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
        }
        
        if (section.subsections) {
          for (const subsection of section.subsections) {
            const subElement = document.getElementById(subsection.id)
            if (subElement && subElement.offsetTop <= scrollPosition) {
              setActiveSection(subsection.id)
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />
      
      <main className="content flex-1 ml-64 p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Complete Gradle Tutorial for Android Development
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
            <span>👨‍💻 Author: Vikash Kumar</span>
            <span>•</span>
            <span>Senior Android Developer & Technical Writer</span>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            A comprehensive guide covering Gradle from beginner to expert level for Android developers. 
            This tutorial will take you through everything you need to know about Gradle build automation 
            for Android development.
          </p>
        </div>

        <ContentSection id="1" title="Introduction & Fundamentals">
          <div id="1-1" className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">What is Gradle?</h2>
            <p className="mb-4">
              Gradle is a powerful, flexible build automation tool that has become the standard build system 
              for Android development. At its core, Gradle is a general-purpose build tool that can automate 
              the building, testing, publishing, and deployment of software packages or other types of projects.
            </p>
            
            <h3 className="text-2xl font-semibold mb-3">Why Gradle for Android?</h3>
            <p className="mb-4">
              Gradle was chosen by Google as the official build system for Android development because of its:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Flexibility</strong>: Gradle&apos;s domain-specific language (DSL) allows for highly customizable build configurations</li>
              <li><strong>Performance</strong>: Incremental builds, build caching, and parallel execution make builds faster</li>
              <li><strong>Dependency Management</strong>: Sophisticated dependency resolution and management capabilities</li>
              <li><strong>Plugin Ecosystem</strong>: Rich ecosystem of plugins for various development needs</li>
              <li><strong>Multi-Project Support</strong>: Excellent support for complex, multi-module projects</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-3">How Gradle Works</h3>
            <p className="mb-4">
              Gradle operates on the concept of a <strong>Directed Acyclic Graph (DAG)</strong> of tasks. When you run a build:
            </p>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li><strong>Initialization Phase</strong>: Gradle determines which projects are part of the build</li>
              <li><strong>Configuration Phase</strong>: Gradle configures the projects and creates a task graph</li>
              <li><strong>Execution Phase</strong>: Gradle executes the selected tasks in the correct order</li>
            </ol>

            <CodeBlock language="gradle">
{`// Example: Complete Android app build.gradle file
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
}`}
            </CodeBlock>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="text-blue-800">
                <strong>💡 Tip:</strong> Gradle builds are declarative - you describe what you want, not how to do it. 
                Gradle figures out the execution order based on task dependencies.
              </p>
            </div>
          </div>

          <div id="1-2" className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Gradle vs Other Build Systems</h2>
            <p className="mb-4">
              Understanding how Gradle compares to other build systems helps appreciate its advantages and when to use it.
            </p>

            <h3 className="text-2xl font-semibold mb-3">Gradle vs Maven</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-3 text-left">Feature</th>
                    <th className="border p-3 text-left">Gradle</th>
                    <th className="border p-3 text-left">Maven</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3"><strong>Configuration</strong></td>
                    <td className="border p-3">Groovy/Kotlin DSL (flexible)</td>
                    <td className="border p-3">XML (verbose, rigid)</td>
                  </tr>
                  <tr>
                    <td className="border p-3"><strong>Performance</strong></td>
                    <td className="border p-3">Incremental builds, caching</td>
                    <td className="border p-3">Full rebuilds typically required</td>
                  </tr>
                  <tr>
                    <td className="border p-3"><strong>Android Support</strong></td>
                    <td className="border p-3">Native, official support</td>
                    <td className="border p-3">Third-party plugins</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock language="gradle">
{`// Gradle - Concise and readable
dependencies {
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    testImplementation 'junit:junit:4.13.2'
}`}
            </CodeBlock>

            <CodeBlock language="xml">
{`<!-- Maven - Verbose XML -->
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
</dependencies>`}
            </CodeBlock>
          </div>
        </ContentSection>

        <ContentSection id="2" title="Basic Gradle Concepts">
          <div id="2-1" className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Build Scripts and DSL</h2>
            <p className="mb-4">
              Gradle build scripts are the heart of your build configuration. They define how your project should be built, 
              what dependencies it needs, and what tasks should be executed.
            </p>

            <h3 className="text-2xl font-semibold mb-3">Understanding Build Scripts</h3>
            <p className="mb-4">
              Every Gradle project has at least one build script, typically named <code>build.gradle</code> (Groovy DSL) or 
              <code>build.gradle.kts</code> (Kotlin DSL). In Android projects, you&apos;ll typically have:
            </p>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li><strong>Project-level build script</strong> (<code>build.gradle</code> in root directory)</li>
              <li><strong>Module-level build scripts</strong> (<code>build.gradle</code> in each module directory)</li>
            </ol>

            <CodeBlock language="gradle">
{`// Module-level build.gradle (app module)
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
}`}
            </CodeBlock>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <p className="text-yellow-800">
                <strong>⚠️ Warning:</strong> Don&apos;t mix Groovy and Kotlin DSL in the same project. Choose one and stick with it for consistency.
              </p>
            </div>
          </div>

          <div id="2-2" className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Projects and Tasks</h2>
            <p className="mb-4">
              Understanding the relationship between projects and tasks is fundamental to mastering Gradle. 
              Every Gradle build consists of one or more projects, and each project consists of one or more tasks.
            </p>

            <h3 className="text-2xl font-semibold mb-3">Common Android Tasks</h3>
            <CodeBlock language="bash">
{`# Build tasks
./gradlew assemble          # Build all variants
./gradlew assembleDebug     # Build debug variant
./gradlew assembleRelease   # Build release variant

# Clean tasks
./gradlew clean             # Delete build directory
./gradlew cleanBuildCache   # Clean build cache

# Test tasks
./gradlew test              # Run unit tests
./gradlew testDebug         # Run debug unit tests
./gradlew connectedAndroidTest  # Run instrumented tests`}
            </CodeBlock>
          </div>
        </ContentSection>

        <ContentSection id="3" title="Android-Specific Configuration">
          <div id="3-1" className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Android Gradle Plugin</h2>
            <p className="mb-4">
              The Android Gradle Plugin (AGP) is essential for Android development. It provides the tasks, 
              configurations, and conventions necessary to build Android applications and libraries.
            </p>

            <CodeBlock language="gradle">
{`// Apply Android plugins
plugins {
    id 'com.android.application'        // Android App Plugin
    id 'com.android.library'           // Android Library Plugin
    id 'org.jetbrains.kotlin.android'  // Kotlin Android Plugin
    id 'kotlin-kapt'                   // Kotlin Annotation Processing
    id 'dagger.hilt.android.plugin'    // Hilt Dependency Injection
}`}
            </CodeBlock>
          </div>

          <div id="3-2" className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Build Types and Product Flavors</h2>
            <p className="mb-4">
              Build types and product flavors allow you to create different versions of your app with different configurations.
            </p>

            <CodeBlock language="gradle">
{`android {
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
}`}
            </CodeBlock>
          </div>
        </ContentSection>

        <ContentSection id="4" title="Intermediate Topics">
          <div id="4-1" className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Multi-Module Projects</h2>
            <p className="mb-4">
              Multi-module projects help organize large codebases, improve build times through parallelization, 
              and enable better separation of concerns.
            </p>

            <CodeBlock language="gradle">
{`// settings.gradle
rootProject.name = 'MyAndroidApp'

include ':app'
include ':core'
include ':feature-login'
include ':feature-profile'`}
            </CodeBlock>
          </div>

          <div id="4-2" className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Custom Tasks and Plugins</h2>
            <p className="mb-4">
              Creating custom tasks allows you to automate project-specific build steps and extend Gradle&apos;s functionality.
            </p>

            <CodeBlock language="gradle">
{`// Custom task example
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
    public static final String VERSION_NAME = "\${android.defaultConfig.versionName}";
    public static final int VERSION_CODE = \${android.defaultConfig.versionCode};
    public static final String BUILD_TIME = "\${new Date()}";
}
"""
    }
}`}
            </CodeBlock>
          </div>
        </ContentSection>

        <ContentSection id="5" title="Advanced Topics">
          <div id="5-1" className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Custom Plugin Development</h2>
            <p className="mb-4">
              Developing custom plugins allows you to share build logic across projects and create reusable components.
            </p>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6">
              <p className="text-green-800">
                <strong>📝 Note:</strong> Custom plugins are most beneficial when you have complex build logic that needs to be shared across multiple projects or modules.
              </p>
            </div>
          </div>

          <div id="5-2" className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Advanced Scripting Techniques</h2>
            <p className="mb-4">
              Advanced scripting techniques help you create more maintainable and flexible build scripts.
            </p>

            <CodeBlock language="gradle">
{`// Environment-specific configuration
android {
    buildTypes {
        debug {
            buildConfigField "String", "API_BASE_URL", '"https://api-dev.example.com"'
            buildConfigField "boolean", "ENABLE_LOGGING", "true"
        }
        
        release {
            buildConfigField "String", "API_BASE_URL", '"https://api.example.com"'
            buildConfigField "boolean", "ENABLE_LOGGING", "false"
        }
    }
}`}
            </CodeBlock>
          </div>
        </ContentSection>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Learn More</h2>
            <p className="text-gray-600 mb-6">
              This is a condensed version of the complete Gradle tutorial. For the full comprehensive guide 
              with all sections, examples, and detailed explanations, visit the complete documentation.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://gradle.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Official Gradle Docs
              </a>
              <a 
                href="https://developer.android.com/studio/build" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Android Build Docs
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}