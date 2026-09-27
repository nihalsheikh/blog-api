from passlib.context import CryptContext

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Hash password
def hash_password(plain_pswd: str):
    return password_context.hash(plain_pswd)


# Verify password
def verify_password(plain_pswd: str, hash_pswd: str):
    return password_context.verify(plain_pswd, hash_pswd)
