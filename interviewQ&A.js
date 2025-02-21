// Q1 solution:
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers
  console.log(Master process is running on PID: ${process.pid});
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // Forks a new worker process
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(Worker ${worker.process.pid} died);
  });
} else {
  // Worker processes
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello, World!');
  }).listen(8000);

  console.log(Worker process is running on PID: ${process.pid});
}





// Q2 Solution: 
const jwt = require('jsonwebtoken');

function TokenAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}





// Q3: Solution
import React, { useState } from 'react';

export function NameForm(props) {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(A name was submitted: ${name});
    // You can handle the submission logic here, e.g., send data to a server or update the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}




// Q4: Solution

// const crypto = require('crypto');

// var prize = 10;
// var count = 2;
// var ccy = 'USD';
// var cardNumber = 1454112114114111;

// // Hashing the card number or password securely
// const passwordHash = () => {
//   const buf = Buffer.from(cardNumber.toString(), 'utf-8');  // Convert the card number to a buffer
//   const hash = crypto.createHash('sha256');  // Create a SHA-256 hash
//   hash.update(buf);  // Update the hash with the buffer
//   return hash.digest('hex');  // Return the final hash as a hexadecimal string
// };

// // Check if the installment conditions are met
// const checkInstallment = () => {
//   // Assuming installment is valid if the prize is greater than a threshold (e.g., 5) and count > 1
//   if (prize >= 5 && count > 1) {
//     return true;  // Valid installment
//   }
//   return false;  // Invalid installment
// };

// // Get the installment details (e.g., calculate amount to be paid per installment)
// const getInstallment = () => {
//   if (checkInstallment()) {
//     const installmentAmount = prize / count;  // Calculate installment based on prize and count
//     return {
//       installmentAmount: installmentAmount,
//       currency: ccy,
//       installmentCount: count,
//     };
//   } else {
//     return {
//       message: 'Installment conditions not met.',
//     };
//   }
// };

// console.log('Password Hash: ', passwordHash());
// console.log('Installment Details: ', getInstallment());




// Q5: Solution

// suppose you have the folder "scripts" on the server. 
// In that folder you have 2 scripts : app.js and module.js, the code inside app.js is 
// const path = require('path');
//  const fs = require('fs');
//  const dirPath = path.join(_dirname); 
//  fs.readdir(dirPath, function(error , files){} what will be the console output if you execute this script

// Q6: Solution

async componentDidMount() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ /* your data here */ })
  };

  try {
    const response = await fetch('https://api.example.com/endpoint', requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    this.setState({ data, isLoaded: true, error: null });
  } catch (error) {
    this.setState({ error: error.message, isLoaded: true, data: null });
    console.error('Error fetching data:', error);
  }
}
// Q7: Solution

const fs = require("fs");
const path = require("path");

const ListAllFiles = function (CurrentPath, AllFiles = []) {
    // Read the contents of the directory
    const files = fs.readdirSync(CurrentPath);

    files.forEach((fileOrDir) => {
        const fullPath = path.join(CurrentPath, fileOrDir);

        // Check if it's a file or directory
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            // If it's a directory, recurse into it
            ListAllFiles(fullPath, AllFiles);
        } else {
            // If it's a file, add it to the list
            AllFiles.push(fullPath);
        }
    });

    return AllFiles;
};

// Example usage:
const files = ListAllFiles('./your-directory-path');
console.log(files);


// Q8: Solution

class ReferenceDemo extends React.Component {
  display() {
    const name = this.inputDemo.value;
    document.getElementById('disp').innerHTML = name;
  }

  render() {
    return (
      <div>
        <input
          ref={(input) => { this.inputDemo = input; }}
          type="text"
        />
        <button onClick={() => this.display()}>Display Name</button>
        <div id="disp"></div>
      </div>
    );
  }
}





