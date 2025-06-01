import React, { useEffect } from 'react'
import '../Styles/AddEditPage.css'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function AddEditPage() {
  const navigate = useNavigate();
  const uid = useSelector((state) => state.uid.userid);
  let isUpdate = useSelector((state) => state.uid.enableUpdate);
  const isView = useSelector((state) => state.uid.viewMode);

  // //console.log(enableupdate);
  const validateFormData = () => {
    let err = 0;
    let input = document.getElementsByClassName('inputvalue');
    const checkboxbtn = document.querySelectorAll('input[type="checkbox"]:checked');
    const radiobtn = document.querySelectorAll('input[type="radio"]:checked');

    for (let i = 0; i < input.length; i++) {
      if (input[i].value == "") {
        toast.error("This is required field !");
        input[i].style.border = "1px solid red";
        err++;
      } else {
        input[i].style.border = "1px solid #1B6392";
      }
    }

    if (checkboxbtn.length == 0) {
      err++;
      toast.error("Select atleast one hobby !")
    }
    if (radiobtn.length == 0) {
      err++;
      toast.error("Select Gender !")
    }

    if (!err) {
      addFormDetails();
    }

  }
  const addFormDetails = async () => {
    let hobbylist = [];
    let input = document.getElementsByClassName('inputvalue');
    const hobby = document.querySelectorAll('input[type="checkbox"]:checked');
    const gender = document.querySelectorAll('input[type="radio"]:checked');
    //console.log(gender);

    for (let i = 0; i < hobby.length; i++) {
      hobbylist.push(hobby[i].value);
    }
    let res = await fetch(`https://newelbe.onrender.com/insertFormData`, {
      method: "POST",
      body: JSON.stringify({
        name: input[0].value,
        address: input[3].value,
        department: input[1].value,
        udob: input[2].value,
        gender: gender[0].value,
        hobbies: hobbylist
      }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    res = await res.json();
    //console.log(res.msg);
    if (res.msg == "UserInsertedSuccessfully") {
      input[0].value = "",
        input[3].value = "",
        input[1].value = "",
        input[2].value = "",
        hobby[0].checked = false,
        hobby[1].checked = false,
        hobby[2].checked = false,
        hobby[3].checked = false,
        toast.success("User Added Successfully !")
    }
  }
  const HandleBackButton = () => {
    navigate('/listpage');
  }
  const HandleUpdateButton = () => {

  }

  const fetchformdetails = async () => {
    let input = document.getElementsByClassName('inputvalue');
    let rb = document.getElementsByClassName('rb');
    let cb = document.getElementsByClassName('cb');

    let res = await fetch(`https://newelbe.onrender.com/fetchformdetails/${uid}`, {
      method: "GET",
    });
    res = await res.json();
    let data = res.data;
    //console.log(res.data);

    if (res.msg === "Datafound") {
      input[0].value = data[0].uname;
      input[1].value = data[0].udepartment;
      input[2].value = data[0].udob;
      input[3].value = data[0].uaddress;
      //console.log(cb);

      rb[0].value.toLowerCase() === res.data.ugender ? rb[0].checked = true : rb[1].checked = true;
      //console.log(data[0].hobby);
      for (let i = 0; i < cb.length; i++) {
        for (let j = 0; j < data[0].hobby.length; j++) {
          if (cb[i].value == data[0].hobby[j].hobby_id) {

            //console.log(cb[i].value);

            cb[i].checked = true;
          }
        }
      }
    }

  }
  useEffect(() => {
    if (isView || isUpdate) {
      fetchformdetails();
      let input = document.getElementsByClassName('inputvalue');
      let rb = document.getElementsByClassName('rb');
      let cb = document.getElementsByClassName('cb');
      if (isView) {
        for (let i = 0; i < input.length; i++) {
          input[i].disabled = true;
        }

        for (let i = 0; i < rb.length; i++) {
          rb[i].disabled = true;
        }

        for (let i = 0; i < cb.length; i++) {
          cb[i].disabled = true;
        }
      }
      if (isUpdate) {
        for (let i = 0; i < input.length; i++) {
          input[i].disabled = false;
        }

        for (let i = 0; i < rb.length; i++) {
          rb[i].disabled = false;
        }

        for (let i = 0; i < cb.length; i++) {
          cb[i].disabled = false;
        }
      }
    }
  }, [])
  return (
    <div className='userformmainwrapper'>
      <div className="userformwrapper">
        <div className="listpageheaderwrapper">
          <div className='loginheader'><h2>ADD-EDIT PAGE</h2></div>
        </div>
        <div className="nv-grid userformleftrightwrapper">
          <div className="nv-grid-column userformleftwrapper">
            <div className="nv-grid userforminputitem">
              <p>Name : </p>
              <div className="inputfield"><input type="text" className="inputvalue" placeholder='Enter your name...' /></div>
            </div>
            <div className="nv-grid userforminputitem">
              <p>Department : </p>
              <div className="inputfield">
                <select className='inputvalue'>
                  <option value="">Select</option>
                  <option value="designer">Designer</option>
                  <option value="testing"> Testing</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>
            </div>
            <div className="nv-grid userforminputitem">
              <p>Joining Date : </p>
              <div className="inputfield"><input type="date" className="inputvalue date" /></div>
            </div>
            <div className="nv-grid userforminputitem">
              <p>Hobbies : </p>
              <div className="nv-grid-column inputfield">
                <div className="checkboxwrapper">
                  <input className='cb' type="checkbox" value={"1"} /> Reading
                </div>
                <div className="checkboxwrapper">
                  <input className='cb' type="checkbox" value={"2"} /> Swimming
                </div>
                <div className="checkboxwrapper">
                  <input className='cb' type="checkbox" value={"3"} /> Playing
                </div>
                <div className="checkboxwrapper">
                </div>
              </div>
            </div>
          </div>
          <div className="nv-grid-column userformrightwrapper">
            <div className="nv-grid userforminputitem">
              <p>Address : </p>
              <div className="inputfield"><textarea placeholder='Enter address...' className='inputvalue' /></div>
            </div>
            <div className="nv-grid userforminputitem">
              <p>Gender : </p>
              <div className="inputfield">
                <div className="radioinputwrapper">
                  <input type="radio" name="rb" className='rb' value="male" /> Male
                </div>
                <div className="radioinputwrapper">
                  <input type="radio" name="rb" className='rb' value="female" /> Female
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nv-grid userformbuttonwrapper">
          <button className="updatebtn" onClick={HandleUpdateButton} >Update</button>
          <button className='savebtn' onClick={validateFormData}>Save</button>
          <button className='backbtn' onClick={HandleBackButton}>Back</button>
        </div>
      </div>
    </div>
  )
}
