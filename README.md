Little Node script to fill a mustache-like template file with actual data.

# Build

To build it like an executable, first install `pkg` globally:

```
npm install -g pkg
```

and the run:

```
pkg filler.js --targets win --output filler-win.exe
```

to build for Windows, for instance.

# Usage

##### **Specify template and data file:**

```
filler template-file data-file output-file
```

In this case, the template placeholder must contain properties of the object contained inside `data-file`.

Example:

```
filler sample_data/Patient_report_template_190218.html sample_data/data1.json sample_data/out.html
```

##### **Specify template and data folder:**

```
filler template-file data-folder output-file
```

In this case, the template placeholder must contain `{{<file name>.<props>}}`, where `<props<` are properties of the object contained inside `<file-name>.json` that is inside  `data-folder`. If there is only one JSON file inside `data-folder`, you can also use the syntax at **Specify template and data file**.

Example:

```
filler sample_data/Patient_report_template_190218.html sample_data sample_data/out.html
```
