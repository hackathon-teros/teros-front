/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Table } from 'reactstrap';

export function TableCSV({ tableData = [] }: { tableData: any[] }) {
  const keys = Object.keys(tableData[0]);
  console.log(tableData)
  return (
    <Table>
      <thead>
        <tr>
          { keys.map(item => (
            <th>{item}</th>
          )) }
        </tr>
      </thead>
      <tbody>

            {
                tableData.map(item => {  
                    return (
                        <tr>
                            { Object.values(item).map((item2: any) => {
                                return (
                                    <th>
                                        {item2}
                                    </th>
                                )
                            }) }
                        </tr>
                    )
                })
            }    

      </tbody>
    </Table>
  );
}
