import styled from 'styled-components';

const InputLabel = styled.input`
  margin: 0.5rem;
  font-weight: bold;
`;

function TextInputWithLabel({ elementId, label, onChange, ref, value }) {
  return (
    <>
      <label htmlFor={elementId}>{label}</label>
      <InputLabel
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel;
