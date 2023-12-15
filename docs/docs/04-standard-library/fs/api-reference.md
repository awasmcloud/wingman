---
title: API reference
id: api-reference
description: Wing standard library API reference for the fs module
keywords: [Wing sdk, sdk, Wing API Reference]
hide_title: true
sidebar_position: 100
---

<!-- This file is automatically generated. Do not edit manually. -->

# API Reference <a name="API Reference" id="api-reference"></a>


## Classes <a name="Classes" id="Classes"></a>

### Fs <a name="Fs" id="@winglang/sdk.fs.Util"></a>

The fs class is used for interacting with the file system.

All file paths must be POSIX file paths (/ instead of \),
and will be normalized to the target platform if running on Windows.

#### Initializers <a name="Initializers" id="@winglang/sdk.fs.Util.Initializer"></a>

```wing
bring fs;

new fs.Util();
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.fs.Util.absolute">absolute</a></code> | The right-most parameter is considered {to}. Other parameters are considered an array of {from}. |
| <code><a href="#@winglang/sdk.fs.Util.basename">basename</a></code> | Retrieve the final segment of a given file path. |
| <code><a href="#@winglang/sdk.fs.Util.dirname">dirname</a></code> | Retrieve the name of the directory from a given file path. |
| <code><a href="#@winglang/sdk.fs.Util.exists">exists</a></code> | Check if the path exists. |
| <code><a href="#@winglang/sdk.fs.Util.extension">extension</a></code> | Extracts the extension (without the leading dot) from the path, if possible. |
| <code><a href="#@winglang/sdk.fs.Util.isDir">isDir</a></code> | Checks if the given path is a directory and exists. |
| <code><a href="#@winglang/sdk.fs.Util.join">join</a></code> | Join all arguments together and normalize the resulting path. |
| <code><a href="#@winglang/sdk.fs.Util.metadata">metadata</a></code> | Gets the stats of the given path. |
| <code><a href="#@winglang/sdk.fs.Util.mkdir">mkdir</a></code> | Create a directory. |
| <code><a href="#@winglang/sdk.fs.Util.mkdtemp">mkdtemp</a></code> | Create a temporary directory. |
| <code><a href="#@winglang/sdk.fs.Util.readdir">readdir</a></code> | Read the contents of the directory. |
| <code><a href="#@winglang/sdk.fs.Util.readFile">readFile</a></code> | Read the entire contents of a file. |
| <code><a href="#@winglang/sdk.fs.Util.readJson">readJson</a></code> | Read the contents of the file and convert it to JSON. |
| <code><a href="#@winglang/sdk.fs.Util.readYaml">readYaml</a></code> | Convert all YAML objects from a single file into JSON objects. |
| <code><a href="#@winglang/sdk.fs.Util.relative">relative</a></code> | Solve the relative path from {from} to {to} based on the current working directory. |
| <code><a href="#@winglang/sdk.fs.Util.remove">remove</a></code> | Remove files and directories (modeled on the standard POSIX `rm`utility). |
| <code><a href="#@winglang/sdk.fs.Util.setPermissions">setPermissions</a></code> | Set the permissions of the file, directory, etc. |
| <code><a href="#@winglang/sdk.fs.Util.symlink">symlink</a></code> | Creates a symbolic link. |
| <code><a href="#@winglang/sdk.fs.Util.symlinkMetadata">symlinkMetadata</a></code> | Gets the stats of the given path without following symbolic links. |
| <code><a href="#@winglang/sdk.fs.Util.tryReaddir">tryReaddir</a></code> | If the path exists, read the contents of the directory; |
| <code><a href="#@winglang/sdk.fs.Util.tryReadFile">tryReadFile</a></code> | If the file exists and can be read successfully, read the entire contents; |
| <code><a href="#@winglang/sdk.fs.Util.tryReadJson">tryReadJson</a></code> | Retrieve the contents of the file and convert it to JSON if the file exists and can be parsed successfully, otherwise, return `undefined`. |
| <code><a href="#@winglang/sdk.fs.Util.tryReadYaml">tryReadYaml</a></code> | Convert all YAML objects from a single file into JSON objects if the file exists and can be parsed successfully, `undefined` otherwise. |
| <code><a href="#@winglang/sdk.fs.Util.writeFile">writeFile</a></code> | Writes data to a file, replacing the file if it already exists. |
| <code><a href="#@winglang/sdk.fs.Util.writeJson">writeJson</a></code> | Writes JSON to a file, replacing the file if it already exists. |
| <code><a href="#@winglang/sdk.fs.Util.writeYaml">writeYaml</a></code> | Writes multiple YAML objects to a file, replacing the file if it already exists. |

---

##### `absolute` <a name="absolute" id="@winglang/sdk.fs.Util.absolute"></a>

```wing
bring fs;

fs.absolute(...paths: Array<str>);
```

The right-most parameter is considered {to}. Other parameters are considered an array of {from}.

Starting from leftmost {from} parameter, resolves {to} to an absolute path.

If {to} isn't already absolute, {from} arguments are prepended in right to left order,
until an absolute path is found. If after using all {from} paths still no absolute path is found,
the current working directory is used as well. The resulting path is normalized,
and trailing slashes are removed unless the path gets resolved to the root directory.

###### `paths`<sup>Required</sup> <a name="paths" id="@winglang/sdk.fs.Util.absolute.parameter.paths"></a>

- *Type:* str

A sequence of paths or path segments.

---

##### `basename` <a name="basename" id="@winglang/sdk.fs.Util.basename"></a>

```wing
bring fs;

fs.basename(path: str);
```

Retrieve the final segment of a given file path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.fs.Util.basename.parameter.path"></a>

- *Type:* str

The path to evaluate.

---

##### `dirname` <a name="dirname" id="@winglang/sdk.fs.Util.dirname"></a>

```wing
bring fs;

fs.dirname(path: str);
```

Retrieve the name of the directory from a given file path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.fs.Util.dirname.parameter.path"></a>

- *Type:* str

The path to evaluate.

---

##### `exists` <a name="exists" id="@winglang/sdk.fs.Util.exists"></a>

```wing
bring fs;

fs.exists(path: str);
```

Check if the path exists.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.fs.Util.exists.parameter.path"></a>

- *Type:* str

The path to evaluate.

---

##### `extension` <a name="extension" id="@winglang/sdk.fs.Util.extension"></a>

```wing
bring fs;

fs.extension(path: str);
```

Extracts the extension (without the leading dot) from the path, if possible.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.fs.Util.extension.parameter.path"></a>

- *Type:* str

The path to get extension for.

---

##### `isDir` <a name="isDir" id="@winglang/sdk.fs.Util.isDir"></a>

```wing
bring fs;

fs.isDir(path: str);
```

Checks if the given path is a directory and exists.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.fs.Util.isDir.parameter.path"></a>

- *Type:* str

The path to check.

---

##### `join` <a name="join" id="@winglang/sdk.fs.Util.join"></a>

```wing
bring fs;

fs.join(...paths: Array<str>);
```

Join all arguments together and normalize the resulting path.

###### `paths`<sup>Required</sup> <a name="paths" id="@winglang/sdk.fs.Util.join.parameter.paths"></a>

- *Type:* str

The array of path need to join.

---

##### `metadata` <a name="metadata" id="@winglang/sdk.fs.Util.metadata"></a>

```wing
bring fs;

fs.metadata(path: str);
```

Gets the stats of the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.fs.Util.metadata.parameter.path"></a>

- *Type:* str

The path to get stats for.

---

##### `mkdir` <a name="mkdir" id="@winglang/sdk.fs.Util.mkdir"></a>

```wing
bring fs;

fs.mkdir(dirpath: str, opts?: MkdirOptions);
```

Create a directory.

###### `dirpath`<sup>Required</sup> <a name="dirpath" id="@winglang/sdk.fs.Util.mkdir.parameter.dirpath"></a>

- *Type:* str

The path to the directory you want to create.

---

###### `opts`<sup>Optional</sup> <a name="opts" id="@winglang/sdk.fs.Util.mkdir.parameter.opts"></a>

- *Type:* <a href="#@winglang/sdk.fs.MkdirOptions">MkdirOptions</a>

---

##### `mkdtemp` <a name="mkdtemp" id="@winglang/sdk.fs.Util.mkdtemp"></a>

```wing
bring fs;

fs.mkdtemp(prefix?: str);
```

Create a temporary directory.

Generates six random characters to be appended behind a required prefix to create a unique temporary directory.

###### `prefix`<sup>Optional</sup> <a name="prefix" id="@winglang/sdk.fs.Util.mkdtemp.parameter.prefix"></a>

- *Type:* str

The prefix for the directory to be created, default `wingtemp`.

---

##### `readdir` <a name="readdir" id="@winglang/sdk.fs.Util.readdir"></a>

```wing
bring fs;

fs.readdir(dirpath: str);
```

Read the contents of the directory.

###### `dirpath`<sup>Required</sup> <a name="dirpath" id="@winglang/sdk.fs.Util.readdir.parameter.dirpath"></a>

- *Type:* str

The path to evaluate.

---

##### `readFile` <a name="readFile" id="@winglang/sdk.fs.Util.readFile"></a>

```wing
bring fs;

fs.readFile(filepath: str, options?: ReadFileOptions);
```

Read the entire contents of a file.

###### `filepath`<sup>Required</sup> <a name="filepath" id="@winglang/sdk.fs.Util.readFile.parameter.filepath"></a>

- *Type:* str

The path of the file to be read.

---

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.fs.Util.readFile.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.fs.ReadFileOptions">ReadFileOptions</a>

The `encoding` can be set to specify the character encoding.

And the `flag` can be set to specify the attributes.
If a flag is not provided, it defaults to `"r"`.

---

##### `readJson` <a name="readJson" id="@winglang/sdk.fs.Util.readJson"></a>

```wing
bring fs;

fs.readJson(filepath: str);
```

Read the contents of the file and convert it to JSON.

###### `filepath`<sup>Required</sup> <a name="filepath" id="@winglang/sdk.fs.Util.readJson.parameter.filepath"></a>

- *Type:* str

The file path of the JSON file.

---

##### `readYaml` <a name="readYaml" id="@winglang/sdk.fs.Util.readYaml"></a>

```wing
bring fs;

fs.readYaml(filepath: str);
```

Convert all YAML objects from a single file into JSON objects.

###### `filepath`<sup>Required</sup> <a name="filepath" id="@winglang/sdk.fs.Util.readYaml.parameter.filepath"></a>

- *Type:* str

The file path of the YAML file.

---

##### `relative` <a name="relative" id="@winglang/sdk.fs.Util.relative"></a>

```wing
bring fs;

fs.relative(from: str, to: str);
```

Solve the relative path from {from} to {to} based on the current working directory.

At times we have two absolute paths, and we need to derive the relative path from one to the other.

###### `from`<sup>Required</sup> <a name="from" id="@winglang/sdk.fs.Util.relative.parameter.from"></a>

- *Type:* str

---

###### `to`<sup>Required</sup> <a name="to" id="@winglang/sdk.fs.Util.relative.parameter.to"></a>

- *Type:* str

---

##### `remove` <a name="remove" id="@winglang/sdk.fs.Util.remove"></a>

```wing
bring fs;

fs.remove(path: str, opts?: RemoveOptions);
```

Remove files and directories (modeled on the standard POSIX `rm`utility).

Returns `undefined`.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.fs.Util.remove.parameter.path"></a>

- *Type:* str

The path to the file or directory you want to remove.

---

###### `opts`<sup>Optional</sup> <a name="opts" id="@winglang/sdk.fs.Util.remove.parameter.opts"></a>

- *Type:* <a href="#@winglang/sdk.fs.RemoveOptions">RemoveOptions</a>

---

##### `setPermissions` <a name="setPermissions" id="@winglang/sdk.fs.Util.setPermissions"></a>

```wing
bring fs;

fs.setPermissions(path: str, permissions: str);
```

Set the permissions of the file, directory, etc.

Expects a permission string like `"755"` or `"644"`.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.fs.Util.setPermissions.parameter.path"></a>

- *Type:* str

The path of the file or directory.

---

###### `permissions`<sup>Required</sup> <a name="permissions" id="@winglang/sdk.fs.Util.setPermissions.parameter.permissions"></a>

- *Type:* str

The mode to set as a string.

---

##### `symlink` <a name="symlink" id="@winglang/sdk.fs.Util.symlink"></a>

```wing
bring fs;

fs.symlink(target: str, path: str, type?: SymlinkType);
```

Creates a symbolic link.

###### `target`<sup>Required</sup> <a name="target" id="@winglang/sdk.fs.Util.symlink.parameter.target"></a>

- *Type:* str

The path to the target file or directory.

---

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.fs.Util.symlink.parameter.path"></a>

- *Type:* str

The path to the symbolic link to be created.

---

###### `type`<sup>Optional</sup> <a name="type" id="@winglang/sdk.fs.Util.symlink.parameter.type"></a>

- *Type:* <a href="#@winglang/sdk.fs.SymlinkType">SymlinkType</a>

The type of the target.

It can be `FILE`, `DIRECTORY`, or `JUNCTION` (Windows only).
Defaults to `FILE` if not specified.

---

##### `symlinkMetadata` <a name="symlinkMetadata" id="@winglang/sdk.fs.Util.symlinkMetadata"></a>

```wing
bring fs;

fs.symlinkMetadata(path: str);
```

Gets the stats of the given path without following symbolic links.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.fs.Util.symlinkMetadata.parameter.path"></a>

- *Type:* str

The path to get stats for.

---

##### `tryReaddir` <a name="tryReaddir" id="@winglang/sdk.fs.Util.tryReaddir"></a>

```wing
bring fs;

fs.tryReaddir(dirpath: str);
```

If the path exists, read the contents of the directory;

otherwise, return `undefined`.

###### `dirpath`<sup>Required</sup> <a name="dirpath" id="@winglang/sdk.fs.Util.tryReaddir.parameter.dirpath"></a>

- *Type:* str

The path to evaluate.

---

##### `tryReadFile` <a name="tryReadFile" id="@winglang/sdk.fs.Util.tryReadFile"></a>

```wing
bring fs;

fs.tryReadFile(filepath: str, options?: ReadFileOptions);
```

If the file exists and can be read successfully, read the entire contents;

otherwise, return `undefined`.

###### `filepath`<sup>Required</sup> <a name="filepath" id="@winglang/sdk.fs.Util.tryReadFile.parameter.filepath"></a>

- *Type:* str

The path of the file to be read.

---

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.fs.Util.tryReadFile.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.fs.ReadFileOptions">ReadFileOptions</a>

The `encoding` can be set to specify the character encoding, or the `flag` can be set to specify the attributes.

---

##### `tryReadJson` <a name="tryReadJson" id="@winglang/sdk.fs.Util.tryReadJson"></a>

```wing
bring fs;

fs.tryReadJson(filepath: str);
```

Retrieve the contents of the file and convert it to JSON if the file exists and can be parsed successfully, otherwise, return `undefined`.

###### `filepath`<sup>Required</sup> <a name="filepath" id="@winglang/sdk.fs.Util.tryReadJson.parameter.filepath"></a>

- *Type:* str

The file path of the JSON file.

---

##### `tryReadYaml` <a name="tryReadYaml" id="@winglang/sdk.fs.Util.tryReadYaml"></a>

```wing
bring fs;

fs.tryReadYaml(filepath: str);
```

Convert all YAML objects from a single file into JSON objects if the file exists and can be parsed successfully, `undefined` otherwise.

###### `filepath`<sup>Required</sup> <a name="filepath" id="@winglang/sdk.fs.Util.tryReadYaml.parameter.filepath"></a>

- *Type:* str

The file path of the YAML file.

---

##### `writeFile` <a name="writeFile" id="@winglang/sdk.fs.Util.writeFile"></a>

```wing
bring fs;

fs.writeFile(filepath: str, data: str, options?: WriteFileOptions);
```

Writes data to a file, replacing the file if it already exists.

###### `filepath`<sup>Required</sup> <a name="filepath" id="@winglang/sdk.fs.Util.writeFile.parameter.filepath"></a>

- *Type:* str

The file path that needs to be written.

---

###### `data`<sup>Required</sup> <a name="data" id="@winglang/sdk.fs.Util.writeFile.parameter.data"></a>

- *Type:* str

The data to write.

---

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.fs.Util.writeFile.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.fs.WriteFileOptions">WriteFileOptions</a>

The `encoding` can be set to specify the character encoding.

And the `flag` can be set to specify the attributes.
If a flag is not provided, it defaults to `"w"`.

---

##### `writeJson` <a name="writeJson" id="@winglang/sdk.fs.Util.writeJson"></a>

```wing
bring fs;

fs.writeJson(filepath: str, obj: Json);
```

Writes JSON to a file, replacing the file if it already exists.

###### `filepath`<sup>Required</sup> <a name="filepath" id="@winglang/sdk.fs.Util.writeJson.parameter.filepath"></a>

- *Type:* str

The file path that needs to be written.

---

###### `obj`<sup>Required</sup> <a name="obj" id="@winglang/sdk.fs.Util.writeJson.parameter.obj"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The JSON object to be dumped.

---

##### `writeYaml` <a name="writeYaml" id="@winglang/sdk.fs.Util.writeYaml"></a>

```wing
bring fs;

fs.writeYaml(filepath: str, ...objs: Array<Json>);
```

Writes multiple YAML objects to a file, replacing the file if it already exists.

###### `filepath`<sup>Required</sup> <a name="filepath" id="@winglang/sdk.fs.Util.writeYaml.parameter.filepath"></a>

- *Type:* str

The file path that needs to be written.

---

###### `objs`<sup>Required</sup> <a name="objs" id="@winglang/sdk.fs.Util.writeYaml.parameter.objs"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The YANL objects to be dumped.

---



## Structs <a name="Structs" id="Structs"></a>

### Metadata <a name="Metadata" id="@winglang/sdk.fs.Metadata"></a>

Metadata of a file system object.

#### Initializer <a name="Initializer" id="@winglang/sdk.fs.Metadata.Initializer"></a>

```wing
bring fs;

let Metadata = fs.Metadata{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.fs.Metadata.property.accessed">accessed</a></code> | <code><a href="#@winglang/sdk.std.Datetime">datetime</a></code> | The date and time the file was last accessed. |
| <code><a href="#@winglang/sdk.fs.Metadata.property.created">created</a></code> | <code><a href="#@winglang/sdk.std.Datetime">datetime</a></code> | The date and time the file was created. |
| <code><a href="#@winglang/sdk.fs.Metadata.property.fileType">fileType</a></code> | <code><a href="#@winglang/sdk.fs.FileType">FileType</a></code> | The type of file. |
| <code><a href="#@winglang/sdk.fs.Metadata.property.modified">modified</a></code> | <code><a href="#@winglang/sdk.std.Datetime">datetime</a></code> | The date and time the file was last modified. |
| <code><a href="#@winglang/sdk.fs.Metadata.property.permissions">permissions</a></code> | <code>str</code> | The permissions of the file. |
| <code><a href="#@winglang/sdk.fs.Metadata.property.size">size</a></code> | <code>num</code> | The size of the file in bytes. |

---

##### `accessed`<sup>Required</sup> <a name="accessed" id="@winglang/sdk.fs.Metadata.property.accessed"></a>

```wing
accessed: datetime;
```

- *Type:* <a href="#@winglang/sdk.std.Datetime">datetime</a>

The date and time the file was last accessed.

---

##### `created`<sup>Required</sup> <a name="created" id="@winglang/sdk.fs.Metadata.property.created"></a>

```wing
created: datetime;
```

- *Type:* <a href="#@winglang/sdk.std.Datetime">datetime</a>

The date and time the file was created.

---

##### `fileType`<sup>Required</sup> <a name="fileType" id="@winglang/sdk.fs.Metadata.property.fileType"></a>

```wing
fileType: FileType;
```

- *Type:* <a href="#@winglang/sdk.fs.FileType">FileType</a>

The type of file.

---

##### `modified`<sup>Required</sup> <a name="modified" id="@winglang/sdk.fs.Metadata.property.modified"></a>

```wing
modified: datetime;
```

- *Type:* <a href="#@winglang/sdk.std.Datetime">datetime</a>

The date and time the file was last modified.

---

##### `permissions`<sup>Required</sup> <a name="permissions" id="@winglang/sdk.fs.Metadata.property.permissions"></a>

```wing
permissions: str;
```

- *Type:* str

The permissions of the file.

---

##### `size`<sup>Required</sup> <a name="size" id="@winglang/sdk.fs.Metadata.property.size"></a>

```wing
size: num;
```

- *Type:* num

The size of the file in bytes.

---

### MkdirOptions <a name="MkdirOptions" id="@winglang/sdk.fs.MkdirOptions"></a>

Custom settings for creating directory.

#### Initializer <a name="Initializer" id="@winglang/sdk.fs.MkdirOptions.Initializer"></a>

```wing
bring fs;

let MkdirOptions = fs.MkdirOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.fs.MkdirOptions.property.mode">mode</a></code> | <code>str</code> | A file mode. |
| <code><a href="#@winglang/sdk.fs.MkdirOptions.property.recursive">recursive</a></code> | <code>bool</code> | Indicates whether parent folders should be created. |

---

##### `mode`<sup>Optional</sup> <a name="mode" id="@winglang/sdk.fs.MkdirOptions.property.mode"></a>

```wing
mode: str;
```

- *Type:* str
- *Default:* "0777"

A file mode.

The string will be parsed as an octal integer.

---

##### `recursive`<sup>Optional</sup> <a name="recursive" id="@winglang/sdk.fs.MkdirOptions.property.recursive"></a>

```wing
recursive: bool;
```

- *Type:* bool
- *Default:* true

Indicates whether parent folders should be created.

If a folder was created, the path to the first created folder will be returned.

---

### ReadFileOptions <a name="ReadFileOptions" id="@winglang/sdk.fs.ReadFileOptions"></a>

Custom settings for reading from a file.

#### Initializer <a name="Initializer" id="@winglang/sdk.fs.ReadFileOptions.Initializer"></a>

```wing
bring fs;

let ReadFileOptions = fs.ReadFileOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.fs.ReadFileOptions.property.encoding">encoding</a></code> | <code>str</code> | The character encoding utilized for file reading. |
| <code><a href="#@winglang/sdk.fs.ReadFileOptions.property.flag">flag</a></code> | <code>str</code> | The `flag` can be set to specify the attributes. |

---

##### `encoding`<sup>Optional</sup> <a name="encoding" id="@winglang/sdk.fs.ReadFileOptions.property.encoding"></a>

```wing
encoding: str;
```

- *Type:* str
- *Default:* "utf-8"

The character encoding utilized for file reading.

---

##### `flag`<sup>Optional</sup> <a name="flag" id="@winglang/sdk.fs.ReadFileOptions.property.flag"></a>

```wing
flag: str;
```

- *Type:* str
- *Default:* "r".

The `flag` can be set to specify the attributes.

---

### RemoveOptions <a name="RemoveOptions" id="@winglang/sdk.fs.RemoveOptions"></a>

Custom settings for removing files and directories.

#### Initializer <a name="Initializer" id="@winglang/sdk.fs.RemoveOptions.Initializer"></a>

```wing
bring fs;

let RemoveOptions = fs.RemoveOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.fs.RemoveOptions.property.force">force</a></code> | <code>bool</code> | When `true`, exceptions will be ignored if `path` does not exist. |
| <code><a href="#@winglang/sdk.fs.RemoveOptions.property.recursive">recursive</a></code> | <code>bool</code> | If `true`, perform a recursive directory removal. |

---

##### `force`<sup>Optional</sup> <a name="force" id="@winglang/sdk.fs.RemoveOptions.property.force"></a>

```wing
force: bool;
```

- *Type:* bool
- *Default:* true

When `true`, exceptions will be ignored if `path` does not exist.

---

##### `recursive`<sup>Optional</sup> <a name="recursive" id="@winglang/sdk.fs.RemoveOptions.property.recursive"></a>

```wing
recursive: bool;
```

- *Type:* bool
- *Default:* true

If `true`, perform a recursive directory removal.

In
recursive mode, operations are retried on failure.

---

### WriteFileOptions <a name="WriteFileOptions" id="@winglang/sdk.fs.WriteFileOptions"></a>

Custom settings for writing to a file.

#### Initializer <a name="Initializer" id="@winglang/sdk.fs.WriteFileOptions.Initializer"></a>

```wing
bring fs;

let WriteFileOptions = fs.WriteFileOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.fs.WriteFileOptions.property.encoding">encoding</a></code> | <code>str</code> | The character encoding utilized for file writing. |
| <code><a href="#@winglang/sdk.fs.WriteFileOptions.property.flag">flag</a></code> | <code>str</code> | The `flag` can be set to specify the attributes. |

---

##### `encoding`<sup>Optional</sup> <a name="encoding" id="@winglang/sdk.fs.WriteFileOptions.property.encoding"></a>

```wing
encoding: str;
```

- *Type:* str
- *Default:* "utf-8"

The character encoding utilized for file writing.

---

##### `flag`<sup>Optional</sup> <a name="flag" id="@winglang/sdk.fs.WriteFileOptions.property.flag"></a>

```wing
flag: str;
```

- *Type:* str
- *Default:* "w".

The `flag` can be set to specify the attributes.

---


## Enums <a name="Enums" id="Enums"></a>

### FileType <a name="FileType" id="@winglang/sdk.fs.FileType"></a>

Represents the type of a file system object.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.fs.FileType.FILE">FILE</a></code> | Represents a regular file. |
| <code><a href="#@winglang/sdk.fs.FileType.DIRECTORY">DIRECTORY</a></code> | Represents a directory. |
| <code><a href="#@winglang/sdk.fs.FileType.SYMLINK">SYMLINK</a></code> | Represents a symbolic link. |
| <code><a href="#@winglang/sdk.fs.FileType.OTHER">OTHER</a></code> | Represents any type of file system object that is not `FILE`, `DIRECTORY` or `SYMLINK`. |

---

##### `FILE` <a name="FILE" id="@winglang/sdk.fs.FileType.FILE"></a>

Represents a regular file.

---


##### `DIRECTORY` <a name="DIRECTORY" id="@winglang/sdk.fs.FileType.DIRECTORY"></a>

Represents a directory.

---


##### `SYMLINK` <a name="SYMLINK" id="@winglang/sdk.fs.FileType.SYMLINK"></a>

Represents a symbolic link.

---


##### `OTHER` <a name="OTHER" id="@winglang/sdk.fs.FileType.OTHER"></a>

Represents any type of file system object that is not `FILE`, `DIRECTORY` or `SYMLINK`.

This includes sockets, FIFOs (named pipes), block devices, and character devices.

---


### SymlinkType <a name="SymlinkType" id="@winglang/sdk.fs.SymlinkType"></a>

Represents the type of the target for creating symbolic links.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.fs.SymlinkType.FILE">FILE</a></code> | Symbolic link that points to a file. |
| <code><a href="#@winglang/sdk.fs.SymlinkType.DIRECTORY">DIRECTORY</a></code> | Symbolic link that points to a directory. |
| <code><a href="#@winglang/sdk.fs.SymlinkType.JUNCTION">JUNCTION</a></code> | Windows-specific: Symbolic link that points to a directory junction. |

---

##### `FILE` <a name="FILE" id="@winglang/sdk.fs.SymlinkType.FILE"></a>

Symbolic link that points to a file.

---


##### `DIRECTORY` <a name="DIRECTORY" id="@winglang/sdk.fs.SymlinkType.DIRECTORY"></a>

Symbolic link that points to a directory.

---


##### `JUNCTION` <a name="JUNCTION" id="@winglang/sdk.fs.SymlinkType.JUNCTION"></a>

Windows-specific: Symbolic link that points to a directory junction.

---
