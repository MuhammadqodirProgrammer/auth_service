const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Io = require('../utils/Io');
const Users = new Io('./db/users.json');

exports.registerPost = async (req, res) => {
	try {
		const users = await Users.read();
		const { firstname, lastname, email, password } = req.body;

		const findUser = users.find((u) => u.email === email);
		if (findUser) {
			return res.status(200).json({ message: 'User alaready registered' });
		} else {
			const id = (users[users.length - 1]?.id || 0) + 1;
			const hashedPassword = await bcrypt.hash(password, 12);
			// new user
			const newUser = {
				id,
				firstname,
				lastname,
				email,
				password: hashedPassword,
			};
			const data = users.length ? [...users, newUser] : [newUser];
			Users.write(data);
			res.status(200).json({ status: 'OK',message:"You are registerd" , newUser });
		}

	} catch (error) {
		res.status(500).json({ messege: 'Internal server error', error });
	}
};

exports.loginPost = async (req, res) => {
	try {
		const users = await Users.read();
		const { email, password } = req.body;

		const findUser = users.find((u) => u.email === email);
		if (!findUser) {
			return res.status(400).json({ message: 'Email or  password incorrect!' });
		}
		const match = await bcrypt.compare(password, findUser.password);
		if (!match) {
			return res.status(400).json({ message: 'Email or  password incorrect!' });
		} else {
			const token = await jwt.sign({ id: 1 }, process.env.SECRET_KEY, {
				expiresIn: '24h',
			});

			res.status(200).json({ status: 'OK', message: 'You are logined', token });
		}
	} catch (error) {
		res.status(500).json({ messege: 'Internal server error', error });
	}
};


exports.users = async (req, res) => {
	try {
		const users = await Users.read();
		
		res.status(200).json({ status: 'OK', data: users,  });
	} catch (error) {
		res.status(500).json({ messege: 'Internal server error', error });
	}
};
