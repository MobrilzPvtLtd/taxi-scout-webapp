import React, { useState } from "react";

const How_It_Works = () => {
  const [visible, setVisible] = useState(0)
  const work = () => {
    if (visible == 0 || visible == 2 || visible == 3  || visible == 4){
      setVisible(1)
     }else{
        setVisible(0)
      }
    }
    const work2 = () => {
      if (visible == 0 || visible == 1 || visible == 3  || visible == 4){
        setVisible(2)
       }else{
          setVisible(0)
        }
      }
      const work3 = () => {
        if (visible == 0 || visible == 1 || visible == 2  || visible == 4){
          setVisible(3)
         }else{
            setVisible(0)
          }
        }
        const work4 = () => {
          if (visible == 0 || visible == 1 || visible == 3  || visible == 2){
            setVisible(4)
           }else{
              setVisible(0)
            }
          }
  return (
    <div>
      <div className="works-main container">
        <div className="work-left">
          <button onClick={work} className="work-box">box heading 1</button>
          <button onClick={work2} className="work-box">box heading 2</button>
          <button onClick={work3} className="work-box">box heading 3</button>
          <button onClick={work4} className="work-box">box heading 4</button>
        </div>
        <div className="work-right">
          {(visible == 1)?(
          <div className="text-box">hariom</div>):null}
          {(visible == 2)?(
          <div className="text-box">hello bhai</div>):null}
          {(visible == 3)?(
          <div className="text-box">1234567890</div>):null}
          {(visible == 4)?(
          <div className="text-box">abc</div>):null}
        </div>
      </div>
    </div>
  );
};

export default How_It_Works;
