import React, { useState, useEffect } from "react";
import { useDrop , useDrag} from 'react-dnd'
import "./App.css";
import { BiAddToQueue } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import Swal from "sweetalert2";
const App = () => {

  //---------------------------drop-------------
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: () => ({ name: "form" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
    
  }));

  //-----------------------------input-drag--------------------------
  const inputRef = useDrag(() => ({
    type: "box",
    item: { name : "input" },
    end: (item, monitor) => {
      // console.log("item...", item)
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        handleAddInPt();
     
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }));

  //---------------------------------image-drag----------------------
    const imageRef = useDrag(() => ({
    type: "box",
    item: { name : "image" },
    end: (item, monitor) => {
      // console.log("item...", item)
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        handleAddimg()
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }));

  //-----------------------------textarea-drag------------------------
  const textAreaRef = useDrag(() => ({
    type: "box",
    item: { name : "textarea" },
    end: (item, monitor) => {
      // console.log("item...", item)
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        handleAddtxt();
       }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }));

  // getting the values of local storage----------------------------------
  const getDatafromLS = () => {
    const data = localStorage.getItem("forms");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };
  // ----------------------------------------------
  const [AddInputs, setAddInputs] = useState([]);
  const [AddTxt, setAddtxt] = useState([]);
  const [Addimg, setAddimg] = useState([]);

  //daynamic input filed add-----------------------
  const handleAddInPt = () => {
    const abc = [...AddInputs, []];
    setAddInputs(abc);
  };
  const handleAddtxt = () => {
    const abc = [...AddTxt, []];
    setAddtxt(abc);
  };
  const handleAddimg = () => {
    const abc = [...Addimg, []];
    setAddimg(abc);
  };

  // localstore ------------------------------------
  const [forms, setforms] = useState(getDatafromLS());

  //dynamic value add--------------------------------
  const handleChange = (onChangeValue, i) => {
    const inputdata = [...AddInputs];
    inputdata[i] = onChangeValue.target.value;
    setAddInputs(inputdata);
  };
  const handleChange2 = (onChangeValue, i) => {
    const inputdata = [...AddTxt];
    inputdata[i] = onChangeValue.target.value;
    setAddtxt(inputdata);
  };
  const handleChange3 = (onChangeValue, i) => {
    const inputdata = [...Addimg];
    inputdata[i] = onChangeValue.target.value;
    setAddimg(inputdata);
  };
  
  //submit event Handling--------------------------------------------------
  const handleAddBookSubmit = (e) => {
    e.preventDefault();

    if (AddInputs.length < 1 && AddTxt.length < 1 && Addimg.length < 1) {
      Swal.fire({
        icon: 'error',
        text: 'Something went wrong!',
      })
    } else {
      let form = {
        AddInputs,
        AddTxt,
        Addimg,
      };
      //alert-------btn-------------------------------
      setforms([...forms, form]);
      setAddInputs([]);
      setAddtxt([]);
      setAddimg([]);
      Swal.fire(
        "completed successfully!",
        "You clicked the button!",
        "success"
      );
      // console.log(AddInputs);
    }
  };

  //setting the values of localStorage--------------------------------
  useEffect(() => {
    localStorage.setItem("forms", JSON.stringify(forms));
  }, [forms]);
  // delete value from LS----------------------------
  const deleteBook = (AddInputs) => {
    const filteredBooks = forms.filter((element, index) => {
      return element.AddInputs !== AddInputs;
    });
    setforms(filteredBooks);
  };
  // ----------------------------------------------------------------------------------------------
  return (
   
    <div>
      <section id="home">
        <header>
          <div className="nav">
            <div className="logo"></div>
            <div className="navbar">
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#table">Table</a>
                </li>
              </ul>
            </div>
          </div>
        </header>
        {/* main---------------------------------------------------------------------------- */}
      
      	
        <main>
          <div className="form-card">
            <div>
              <div className="circle">
                <p>create form</p>
              </div>
              <div className="form-btn">
                <label>Input</label>
                <button onClick={() => handleAddInPt()} name="myButton" ref={inputRef[1]}>
                  Add <BiAddToQueue />
                </button>
              </div>
              <div className="form-btn">
                <label>TextArea</label>
                <button onClick={() => handleAddtxt()}  ref={textAreaRef[1]}>
                  Add <BiAddToQueue />
                </button>
              </div>
              <div className="form-btn">
                <label>Image</label>
                <button onClick={() => handleAddimg()}  ref={imageRef[1]}>
                  Add <BiAddToQueue />
                </button>
              </div>
            </div>
          </div>
          {/*form-card-2--------------------------------------------- */}
          <div className="form-card" ref={drop}>
            <div className="form-view">
              <form onSubmit={handleAddBookSubmit}>
                <div>
                  {AddInputs.map((data, i) => (
                    <>
                      <div className="form-group">
                        <input
                          type="text "
                          placeholder="Enter your Name"
                          onChange={(e) => handleChange(e, i)}
                          value={data}
                          required
                          autoComplete="none"
                        />
                      </div>
                    </>
                  ))}
                  {/* x---------------------------2------------------------------x */}
                  {AddTxt.map((data, i) => (
                    <>
                      <div className="form-group">
                        <textarea
                          placeholder="Enter your Address"
                          onChange={(e) => handleChange2(e, i)}
                          value={data}
                          required
                          autoComplete="none"
                        />
                      </div>
                    </>
                  ))}
                  {/* x---------------------------------3---------------------------x */}
                  {Addimg.map((data, i) => (
                    <>
                      <div className="form-group">
                        <input
                          type="file"
                          className="files"
                          placeholder="Enter your Name"
                          onChange={(e) => handleChange3(e, i)}
                          value={data}
                          required
                          autoComplete="none"
                        />
                      </div>
                    </>
                  ))}
                  {AddInputs.length < 1 &&
                  AddTxt.length < 1 &&
                  Addimg.length < 1 ? (
                    <div>No input is created!!!</div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div>
                  <button type="submit" className="submitbtn">
                    submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </section>
      {/* -----------------------------------------section-2---------------------------------------- */}
      <section id="table">
        <div className="main">
     
          <div className="view-cards">
            {forms.length > 0 && (
              <>
                <div className="table-responsive">
                  <table className="table" cellSpacing={12}>
                    <thead>
                      <tr>
                        <th>Names</th>
                        <th>Address</th>
                        <th>Avatar</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {forms.map((item) => (
                        <tr>
                         <td>{item.AddInputs.map(inputs => <div>{inputs}</div>)}</td>
                          <td>{item.AddTxt.map(text => <div>{text}</div>)}</td>
                          <td>{item.Addimg.map(img => <div>{img}</div>)}</td>
                          <td
                            className="delete-btn"
                            onClick={() => deleteBook(item.AddInputs)}
                          >
                            delete <MdDelete />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="Removeall" onClick={() => setforms([])}>
                  Remove All
                </button>
              </>
            )}
            {forms.length < 1 && (
              <div className="show-msg">No data are added yet!!!</div>
            )}
          </div>
        </div>
  
      </section>
    </div>
  );
};


export default App;
