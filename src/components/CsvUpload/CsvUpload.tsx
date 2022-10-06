import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { terosService } from '../../service/TerosService';

// eslint-disable-next-line import/prefer-default-export
export function CsvUploadComponent() {
  const [file, setFile] = useState();
  const [data, setData] = useState<any>();

  const fileReader = new FileReader();

  const handleOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = async (e: any) => {
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

  useEffect(() => {
    (async () => {
      const res = await terosService.postFile(data);
      console.log(res);
    })();
  }, [data]);

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
