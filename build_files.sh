echo "BUILD START"

python --version and pip --version
pip install -r requirements.txt
python manage.py collectstatic --noinput

echo "BUILD END"
