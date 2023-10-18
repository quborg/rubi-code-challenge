import React from 'react';
import { Table } from 'reactstrap';

import './index.sass';

const NewTable = ({ columns, data, onEdit, onDelete, schemaKeys }) => {

  if (!data || !data.length) return <div>[..]</div>

  return (
    <Table>
      <thead>
        <tr>
          {
            columns.map((colName) => <th key={colName} className={colName}>{colName}</th>)
          }
          <th key="th-actions">actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {schemaKeys.map((key) =>
              <td key={`${item._id}-${item[key]}`}>
                {item[key]}
              </td>
            )}
            <td key="td-actions">
              <i className="fas fa-edit action" onClick={() => onEdit(item._id)}></i>
              <i className="fas fa-trash action" onClick={() => onDelete(item._id)}></i>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

}

export default NewTable;