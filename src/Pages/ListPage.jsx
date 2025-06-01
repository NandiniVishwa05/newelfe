import React, { useEffect, useState } from 'react'
import '../Styles/ListPage.css'
import { IoEyeSharp } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CiSearch } from "react-icons/ci";
import { setEnableUpdate, setViewMode, setUserId } from '../redux/slice'
import { useDispatch } from 'react-redux';
export default function ListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tabledata, setTableData] = useState([]);
  const [searchinput, setSearchInput] = useState('');

  const fetchTableListData = async () => {
    let res = await fetch("https://newelbe.onrender.com/fetchtabledata", {
      method: "GET",
    });
    res = await res.json();
    if (res.msg == "Datafound") {
      setTableData(res.data)
    }
  }

  const enableAddEditPage = () => {
    //console.log(tabledata[0]);
    dispatch(setEnableUpdate(false));
    dispatch(setViewMode(false));
    navigate('/addeditpage');
  }

  const HandleDelete = async (uid) => {
    let res = await fetch(`https://newelbe.onrender.com/deleteuserdata/${uid}`, {
      method: "DELETE",
    });
    res = await res.json();
    if (res.msg == "DataDeleted") {
      toast.success("Data Deletd Successfully !")
      fetchTableListData()
    }
  }

  const HandleSearch = async () => {
    //console.log("HelloSearch");
    let res = await fetch(`https://newelbe.onrender.com/searchuserdata/${searchinput}`, {
      method: "GET",
    });
    res = await res.json();
    if (res.msg == "SearchDataSuccessfully") {
      toast.success("Data found Successfully !")
      setTableData(res.data);
    } else {
      toast.error("Data not Found !")
    }
  }
  const HandleEdit = () => {
    // dispatch(setEnableUpdate(true))
    navigate('/addeditpage')
  }
  const HandleViewMode = () => {
    // dispatch(setViewMode(true))
    navigate('/addeditpage')
  }
  useEffect(() => {
    fetchTableListData()
  }, [])
  return (
    <div className='listpagemainwrapper'>
      <div className="listpagewrapper">
        <div className="nv-spread listpageheaderwrapper">
          <div className='loginheader'><h2>LIST PAGE</h2></div>
          <div className="listpageaddnewrapper"><button onClick={enableAddEditPage}>Add New</button></div>
        </div>
        <div className="nv-vh-center listpagesearchwrapper">
          <div className="listpageinputnamewrapper">Search by name: </div>
          <div className='nv-grid listpagesearchandbuttonwrapper'>
            <div className="listpagesearchinputwrapper"><input type="text" name="" value={searchinput} onChange={(e) => setSearchInput(e.target.value)} /></div>
            <div className="listpagesearchbutton"><button onClick={() => { HandleSearch() }}><CiSearch /></button></div>
          </div>
        </div>
        <div className="nv-vh-center listpagetablemainwrapper">
          <div className="listpagetableheader"><h3 className='loginheader'>Table List Data</h3></div>
          <div className="listpagetablewrapper">
            <table>
              <thead>
                <th>Name</th>
                <th>Department</th>
                <th>Joining Date</th>
                <th>Action</th>
              </thead>
              <tbody>
                {tabledata.map((user) => (
                  <tr className="table-row" key={user.id}>
                    <td className="row-item">{user.uname}</td>
                    <td className="row-item">{user.udepartment}</td>
                    <td className="row-item">{user.udob}</td>
                    <td className="nv-grid row-item">
                      <button onClick={() => { HandleViewMode(); dispatch(setUserId(user.id)); dispatch(setViewMode(true)); dispatch(setEnableUpdate(false)); }}><IoEyeSharp /></button>
                      <button onClick={() => { HandleEdit(); dispatch(setUserId(user.id)); dispatch(setEnableUpdate(true)); dispatch(setViewMode(false)); }}><FiEdit /></button>
                      <button onClick={() => { HandleDelete(user.id) }}><AiOutlineDelete /> </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
