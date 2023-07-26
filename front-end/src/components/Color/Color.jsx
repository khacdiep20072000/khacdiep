const Color = (props) => {
  const { color, setColor } = props;

  return (
    <div className="colors ps-0">
      {color?.map((c) => (
        <div key={c._id}>
          <input
            type="radio"
            className="radio"
            name="color"
            id={"radio-1 " + c._id}
          />
          <label
            htmlFor={"radio-1 " + c._id}
            style={{ backgroundColor: c.title }}
            onClick={() => setColor(c._id)}
          ></label>
        </div>
      ))}
    </div>
  );
};

export default Color;
