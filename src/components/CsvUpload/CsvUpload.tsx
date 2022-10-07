import React, { useState } from 'react';
import Papa from 'papaparse';
import { TableCSV as Table } from '../Table/Table';
import { terosService } from '../../service/TerosService';
import { LoginModal } from '../LoginModal/LoginModal';

// eslint-disable-next-line import/prefer-default-export
export function CsvUploadComponent() {
  const [file, setFile] = useState();
  const [data, setData] = useState<any[]>([]);
  const [fetchData, setFetchData] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fileReader = new FileReader();

  const handleClickButton = (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) return;

    terosService
      .getData()
      .then((res) => setFetchData(res.data.data))
      .catch((err) => console.error(err));
  };

  const handleOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) return;

    if (file) {
      fileReader.onload = (event: any) => {
        const csvOutput = event.target.result;
        const csvToJson = Papa.parse(csvOutput, {
          header: true,
        });
        setData(csvToJson.data);
      };

      fileReader.readAsText(file);

      const { data: dataResponse } = await terosService.postFile(data);
      setFetchData(dataResponse);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <button onClick={() => setIsOpen(true)}>Fazer login</button>
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

        <button onClick={handleClickButton}>Download</button>
      </form>
      {fetchData.length > 0 && <Table tableData={fetchData} />}

      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
