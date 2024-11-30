import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const How_It_Works = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(1)
  const work = () => {
    if (visible == 0 || visible == 2 || visible == 3  || visible == 4){
      setVisible(1)
     }else{
        setVisible(1)
      }
    }
    const work2 = () => {
      if (visible == 0 || visible == 1 || visible == 3  || visible == 4){
        setVisible(2)
       }else{
          setVisible(2)
        }
      }
      const work3 = () => {
        if (visible == 0 || visible == 1 || visible == 2  || visible == 4){
          setVisible(3)
         }else{
            setVisible(3)
          }
        }
        const work4 = () => {
          if (visible == 0 || visible == 1 || visible == 3  || visible == 2){
            setVisible(4)
           }else{
              setVisible(4)
            }
          }
  return (
    <div id="how_it_works">
      
      <div className="bg-[#00000080] p-4 rounded-lg shadow-xl py-2 mt-5">
      <h1 className="mt-10 text-[50px] font-bold text-white ">{t(`work_text1`)}</h1> 
        <div className="flex gap-5">
        <div className="work-left">
          <button onClick={work} className="work-box mb-2">{t(`work_text2`)}</button>
          <button onClick={work2} className="work-box mb-2">{t(`work_text3`)}</button>
          <button onClick={work3} className="work-box mb-2">{t(`work_text4`)}</button>
          <button onClick={work4} className="work-box mb-2">{t(`work_text5`)}</button>
        </div>
        <div className="mt-5 work-right">
          {(visible == 1)?(
          <div className="text-box">{t(`work_text6`)}</div>):null}
          {(visible == 2)?(
          <div className="text-box">{t(`work_text7`)}</div>):null}
          {(visible == 3)?(
          <div className="text-box">{t(`work_text8`)}</div>):null}
          {(visible == 4)?(
          <div className="text-box">{t(`work_text9`)}</div>):null}
        </div>
        </div>
      </div>
    </div>
  );
};

export default How_It_Works;
