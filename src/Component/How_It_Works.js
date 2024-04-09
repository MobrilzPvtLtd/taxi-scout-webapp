import React, { useState } from "react";

const How_It_Works = () => {
  const [visible, setVisible] = useState(0)
  const work = () => {
    if (visible == 0){
      setVisible(1)
     }else{
        setVisible(0)
      }
    }
  return (
    <div>
      <div className="works-main container">
        <div className="work-left">
          <button onClick={work} className="work-box">box heading 1</button>
          <div className="work-box">box heading 2</div>
          <div className="work-box">box heading 3</div>
          <div className="work-box">box heading 4</div>
        </div>
        <div className="work-right">
          {(visible == 1)?(
          <div className="text-box">jfgbsjveufjbgukknuvkyudenvtkunhekyctnhnhb,nhgdkhdvn hjvnkhnsdknhvdshtus  hk lhglthlj;ldsjgls lej ljrluglersajglaslktgejligjlrejhglkjrelgjlrtjglgnjmlrwajlgjrlgw ejlriguoierjilj joiuwrieotldgjlrhglkanglkejrlkgjlugjl;ktejalyjeg;ljerlgjleagj sejrlgldrsjghljslkjglejrtglksdjrgl</div>):null}
          {(visible == 1)?(
          <div className="text-box">jfgbsjveufjbgukknuvkyudenvtkunhekyctnhnhb,nhgdkhdvn hjvnkhnsdknhvdshtus  hk lhglthlj;ldsjgls lej ljrluglersajglaslktgejligjlrejhglkjrelgjlrtjglgnjmlrwajlgjrlgw ejlriguoierjilj joiuwrieotldgjlrhglkanglkejrlkgjlugjl;ktejalyjeg;ljerlgjleagj sejrlgldrsjghljslkjglejrtglksdjrgl</div>):null}
          {(visible == 1)?(
          <div className="text-box">jfgbsjveufjbgukknuvkyudenvtkunhekyctnhnhb,nhgdkhdvn hjvnkhnsdknhvdshtus  hk lhglthlj;ldsjgls lej ljrluglersajglaslktgejligjlrejhglkjrelgjlrtjglgnjmlrwajlgjrlgw ejlriguoierjilj joiuwrieotldgjlrhglkanglkejrlkgjlugjl;ktejalyjeg;ljerlgjleagj sejrlgldrsjghljslkjglejrtglksdjrgl</div>):null}
          {(visible == 1)?(
          <div className="text-box">jfgbsjveufjbgukknuvkyudenvtkunhekyctnhnhb,nhgdkhdvn hjvnkhnsdknhvdshtus  hk lhglthlj;ldsjgls lej ljrluglersajglaslktgejligjlrejhglkjrelgjlrtjglgnjmlrwajlgjrlgw ejlriguoierjilj joiuwrieotldgjlrhglkanglkejrlkgjlugjl;ktejalyjeg;ljerlgjleagj sejrlgldrsjghljslkjglejrtglksdjrgl</div>):null}
        </div>
      </div>
    </div>
  );
};

export default How_It_Works;
