const PersonalInformation = () => {
  return (
    <>
      <p className="text-center h-60 border rounded-sm ">cover photo</p>
      <div className="flex">
        <p>profile photo</p>
        <div>
          <p>{`[name]`}/username</p>
          <span>id:</span>
          <p>popularity/likes</p>
          <span>member since XXXX</span>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
