import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';

import './index.sass';

const NewTable = ({ columns, schemaKeys, data=[], onUpdate, onDelete }) => {
  const [rows, setRows] = useState([])

  useEffect(() => {
    // if(data && data.length > 0 && !!data[0]._id && rows.length !== data.length) 
      setRows(data)
  }, [data]);

  if (!data || !data.length) return <div>[..]</div>

  // let schemaKeys=[], columns=[];

  // if (data && data.length) {
  //   schemaKeys = Object.keys(data[0]).filter(item => item !== '_id' && item !== 'projectLabel' && item !== '__v');
  //   columns = schemaKeys.map(i => i.replace("_", " "));
  // }

  const dateToReadable = date => {
    if (date) {
      const D = date.split('T')[0].split('-');
      return [D[1], D[2], D[0]].join('/');
    } else return date;
  }

  console.log(columns, schemaKeys, data)

  return (
    <Table>
      <thead>
        <tr>
          {
            columns.map((colName) => <th key={colName} className={colName}>{colName}</th>)
          }
          <th key="th-actions" className='actions'>actions</th>
        </tr>
      </thead>
      <tbody>
        {typeof rows.map ? 'function' && rows.map((item) => (
          <tr key={item._id}>
            {schemaKeys.map((key) =>
              <td key={`${item._id}-${key}`}>
                {
                  key === 'project' ?
                    item['projectLabel']
                    :['start_date', 'end_date', 'createdAt', 'updatedAt'].includes(key) ? 
                      dateToReadable(item[key]) : item[key]
                }
              </td>
            )}
            <td key="td-actions" className='flex'>
              <div onClick={() => onUpdate(item)}><i className="fas fa-edit action" /></div>
              <div onClick={() => onDelete(item)}><i className="fas fa-trash action" /></div>
            </td>
          </tr>
        )) : <>[..]</>}
      </tbody>
    </Table>
  );

}

export default NewTable;