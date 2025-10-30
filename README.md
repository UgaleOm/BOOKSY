# Booksy - Book Trading Platform

A complete web application for buying and selling books between students.

## Features

- 🔐 User authentication (registration, login, logout)
- 📚 Book listing and browsing
- 🔍 Advanced search and filtering
- 📱 Responsive design for all devices
- 💬 Contact system between buyers and sellers
- 👤 User profiles and book management
- 🎯 Category-based book organization
- ✅ Mark books as sold/available

## Quick Start

### Option 1: Windows
1. Double-click `setup.bat`
2. Wait for installation to complete
3. Visit http://localhost:5000

### Option 2: Linux/Mac
```bash
chmod +x setup.sh
./setup.sh
```

### Option 3: Manual Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py
```

## Project Structure

```
booksy_website/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── setup.bat             # Windows setup script
├── setup.sh              # Linux/Mac setup script
├── static/
│   ├── css/
│   │   └── style.css     # Main stylesheet
│   ├── js/
│   │   └── main.js       # JavaScript utilities
│   └── images/           # Static images
└── templates/
    ├── index.html        # Homepage
    ├── Book.html         # Buy books page
    ├── Sell.html         # Sell books page
    ├── Login.html        # Login page
    ├── Register.html     # Registration page
    ├── Profile.html      # User profile
    ├── Contact.html      # Contact page
    └── ...              # Other category pages
```

## API Endpoints

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/profile` - Get user profile
- `GET /api/books` - Get all books
- `GET /api/my-books` - Get user's books
- `POST /api/book` - Add new book
- `PUT /api/book/<id>` - Update book
- `DELETE /api/book/<id>` - Delete book
- `POST /api/contact` - Send contact message

## Demo Account

For testing purposes:
- Email: demo@booksy.com
- Password: demo123

## Technologies Used

- **Backend**: Python Flask, SQLAlchemy
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Database**: SQLite (development)
- **Styling**: Custom CSS with responsive design
- **Icons**: Unicode emojis for lightweight design

## Features in Detail

### For Buyers
- Browse books by category
- Search by title, author, or description
- Filter by price, condition, and category
- Contact sellers directly via WhatsApp or provided contact info
- View detailed book information and seller details

### For Sellers
- List books with detailed information
- Upload book images (via URL)
- Set competitive prices
- Manage listings (edit, mark as sold, delete)
- Track listing performance

### For Everyone
- Create free account
- Secure authentication
- Mobile-friendly interface
- Fast and responsive design
- Direct communication between users

## Deployment

### Local Development
```bash
python app.py
```
Access at http://localhost:5000

### Production Deployment
1. Set up proper environment variables
2. Use a production WSGI server (gunicorn, waitress)
3. Configure a reverse proxy (nginx, apache)
4. Set up SSL certificate
5. Use a production database (PostgreSQL, MySQL)

## Security Features

- Password hashing with Werkzeug
- Session-based authentication
- SQL injection protection via SQLAlchemy
- Input validation and sanitization
- CSRF protection ready

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

- Email: support@booksy.com
- Create an issue on GitHub
- Use the contact form in the application

## License

MIT License - feel free to use for educational or commercial projects.

## Future Enhancements

- Image upload for books
- Payment integration
- Push notifications
- Mobile app (React Native/Flutter)
- Advanced analytics
- Recommendation system
- Social features (ratings, reviews)
- Multi-language support

---

Built with ❤️ for students by students. Happy book trading! 📚
