import React, { useState } from 'react';
import Papa from 'papaparse';

// eslint-disable-next-line import/prefer-default-export
export function CsvUploadComponent() {
  const [file, setFile] = useState();
  const [data, setData] = useState<any>();

  const fileReader = new FileReader();

  const handleOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = (event: any) => {
        const csvOutput = event.target.result;
        const csvToJson = Papa.parse(csvOutput);
        console.dir(csvToJson.data);
        setData(csvToJson.data);
      };

      fileReader.readAsText(file);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input
          type='file'
          id='csvFileInput'
          accept='.csv'
          onChange={handleOnChange}
        />

        <button
          type='submit'
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>
    </div>
  );
}
