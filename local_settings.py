DEBUG = True

TEMPLATE_DEBUG = DEBUG

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.postgresql_psycopg2',
		'NAME': 'semesterly',
		'USER': 'myusername',
		'PASSWORD': 'mypassword',
		'HOST': 'localhost',
		'PORT': '5432',
	}
}