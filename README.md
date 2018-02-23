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

```
filler template-file data-file output-file
```

Example:

```
filler sample_data/Patient_report_template_190218.html sample_data/data.json sample_data/out.html
```
