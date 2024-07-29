// eslint-disable-next-line react/prop-types
import PropTypes from 'prop-types';
const User = ({ person }) => {
  console.log(person);
  return (
    <div className=" mt-24">
      <div className="bg-green-400 h-14 max-w-xl mx-auto rounded-xl">
        <h1 className="text-center font-bold text-3xl pt-2">{person.balance}</h1>
      </div>

      <div className="max-w-xl mx-auto mt-10 bg-gray-100 text-center px-5 py-5">
        <div>
            <img src="" alt="" />
        </div>
        <div>
            <p className="text-3xl font-bold">{person.name}</p>
            <p className="text-xl font-semibold mt-1">{person.email}</p>
            <p>Role : <span>{person.role}</span></p>
            <p>Mobile : <span>{person.mobile}</span></p>
            <p>Balance : <span>{person.balance}</span></p>
        </div>
      </div> 
    </div>
  );
};


User.propTypes = {
    person: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      mobile: PropTypes.string, // Allow mobile to be optional
      balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Allow string or number for balance
    }).isRequired,
  };

export default User;
