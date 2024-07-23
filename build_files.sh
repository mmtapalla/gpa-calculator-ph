echo "BUILD START"

python3 --version && pip --version
pip install -r requirements.txt
python3 manage.py collectstatic --noinput

echo "BUILD END"
