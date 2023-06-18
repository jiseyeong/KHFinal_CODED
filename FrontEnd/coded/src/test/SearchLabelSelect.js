import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

const SearchLabelSelect = () => {
  const selectRef = useRef();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .request({
        url: '/PostHashs/selectAllPostTagNames',
        type: 'get',
      })
      .then((resp) => {
        const HashTagNameList = resp.data;
        let arrTemp = [];
        HashTagNameList.forEach((hashTag, index) => {
          arrTemp = arrTemp.concat({
            value: hashTag.hashTag,
            label: hashTag.hashTag,
          });
          setOptions([...options, ...arrTemp]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const check = () => {
    console.log(selectRef.current.getValue());
  };

  // 옵션 내 선택 상자를 custom 가능
  const formatOptionLabel = ({ value, label, customAbbreviation }) => (
    <div style={{ display: 'flex' }}>
      <div>{label}</div>
      <div>{value}</div>
      <div style={{ marginLeft: '10px', color: '#ccc' }}></div>
    </div>
  );

  const formatGroupLabel = () => <div></div>;

  return (
    <>
      <div style={{ width: '400px' }}>
        <CreatableSelect
          isMulti
          options={options}
          ref={selectRef}
          formatGroupLabel={formatGroupLabel}
          formatCreateLabel={formatGroupLabel}
          // formatOptionLabel={formatOptionLabel}
        />
        <p>ag</p>
        <Select options={options} defaultValue={options[0]} />
      </div>
      <button onClick={check}>Check</button>
    </>
  );
};

export default SearchLabelSelect;
