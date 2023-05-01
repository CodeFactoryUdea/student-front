import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Student {
  id: number
  document: String
  fullName: String
}


const index = () => {

  const [formData, setFormData] = useState<Student>({id: 0, document: '', fullName: ''});
  const [studentList, setStudentList] = useState<Student[]>([]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/student/', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  useEffect(() => {

    const getAllStudents = async () => {
      const response = await axios.get("http://localhost:8081/api/student/find-all")
      console.log(JSON.stringify(response.data));
      
      setStudentList(response.data)

    }

    getAllStudents()

  }, [])

  return (
    <div>
      <div className="debug table-container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Document</th>
              <th>Full name</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.document}</td>
                <td>{student.fullName}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      <div className="debug">
        <form onSubmit={handleSubmit}>
          <input type="text" name="document" onChange={handleChange} />
          <input type="text" name="fullName" onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default index