let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
  ];
  
  // API 핸들러 함수
  export default function handler(req, res) {
    const { method } = req;
  
    switch (method) {
      // GET: 사용자 목록 조회
      case 'GET':
        res.status(200).json(users);
        break;
  
      // POST: 새로운 사용자 추가
      case 'POST':
        const newUser = { id: users.length + 1, ...req.body };
        users.push(newUser);
        res.status(201).json(newUser);
        break;
  
      // PUT: 사용자 정보 업데이트 (예: /api/users/1)
      case 'PUT':
        const userId = parseInt(req.query.id);
        const userIndex = users.findIndex((user) => user.id === userId);
  
        if (userIndex !== -1) {
          users[userIndex] = { id: userId, ...req.body };
          res.status(200).json(users[userIndex]);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
        break;
  
      // DELETE: 사용자 삭제 (예: /api/users/1)
      case 'DELETE':
        const deleteUserId = parseInt(req.query.id);
        const deleteUserIndex = users.findIndex((user) => user.id === deleteUserId);
  
        if (deleteUserIndex !== -1) {
          const deletedUser = users.splice(deleteUserIndex, 1);
          res.status(200).json(deletedUser);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
        break;
  
      // 기타 메서드
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }