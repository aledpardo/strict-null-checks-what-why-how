# Typescript strictNullChecks: What, Why, How

## Introduction

Typescript is nowadays the GOTO programming language when creating any type of
applications: web, services or CLI.

With a growing list of features and super-rich type system, it's got the
attention of the enterprise business when creating their software.

With a iterative mentality, slowly the Typescript team at Microsoft keeps
adding more features on every release.

The `strictNullChecks` Typescript compiler option was released long ago, on
version 2.0, however, unless your project predates this version, there's a
chance that your project isn't benefiting from this compiler option.

If you are among this group, welcome, because today we will walkthrough on how
to enable `strictNullChecks` on a large project and ensure it stays on track.

It will demand effort and a change in mentality from the whole team, but, the
benefits are far superior than the downsize of getting a major incident in a
production environment that could have (and should have) be prevented even
before your `git commit "add fancy feature"` command.

## Part 1: What

### What is `strictNullChecks` Typescript compiler option?

From the official [Typescript Docs](https://www.typescriptlang.org/tsconfig#strictNullChecks),
we read:

> When strictNullChecks is false, null and undefined are **effectively ignored**
**by the language**. This can lead to unexpected errors at runtime.

Consider below source:

```typescript
// strictNullChecks: false

interface Entity {
  name: string,
  type: "PERSON" | "ORG"
  age?: number
}

const aPerson = {
  name: "John Doe",
  type: "PERSON",
  age: 39
}

const aCompany {
  name: "XPTO Inc.",
  type: "ORG",
}

const logAge = (entity: Entity) => console.log(entity.name + " is " + age.toString() + " years old");

logAge(aPerson); // John Doe is 39 years old
logAge(aCompany); // XPTO Inc. is undefined years old
```

### What are the problems with `strictNullChecks` set to `false`?

1. It won't warn you when you're accessing a possibly `null` or `undefined` value
1. It will compile the code into JavaScript, letting a potential bugs slip into production
1. When provoked, runtime errors will be thrown, letting your application unstable

### What can be done to prevent these problems without enabling it?

1. Check it by yourself, without any tool (error prone)
1. Ask you team to check it as well (good luck)
1. Enable an akin ESLint rule

## Part 2: Why

### Why not enabling is not an idea?

## Part 3: How

### How to enable `strictNullChecks` on a large project

### How to ensure fixed files remains fixed?

### How to ensure new files are included in `strictNullChecks`?

### How to ensure touched files have their errors fixed?

### How to deal with files with too many errors?

