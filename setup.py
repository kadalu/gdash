from setuptools import setup


def get_version():
    from gdash.version import VERSION

    return VERSION


setup(
    name="gdash",
    version=get_version(),
    packages=["gdash"],
    include_package_data=True,
    install_requires=["cherrypy", "glustercli"],
    entry_points={
        "console_scripts": [
            "gdash = gdash.__main__:main",
        ]
    },
    package_data={
        "gdash": [
            "ui/*.json",
            "ui/*.html",
            "ui/*.png",
            "ui/*.js",
            "ui/*.txt",
            "ui/static/js/*.js",
            "ui/static/js/*.js.map",
            "ui/static/js/*.txt",
            "ui/static/css/*.css",
            "ui/static/css/*.css.map",
            "ui/static/media/*.svg",
        ]
    },
    platforms="linux",
    zip_safe=False,
    author="Aravinda Vishwanathapura",
    author_email="aravinda@kadalu.io",
    description="GlusterFS Dashboard",
    license="Apache-2.0",
    keywords="glusterfs, gui, dashboard",
    url="https://github.com/kadalu/gdash",
    long_description="""
    This tool is based on remote execution support provided by
    GlusterFS cli for `volume info` and `volume status` commands
    """,
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Topic :: Utilities",
        "Environment :: Console",
        "Environment :: Web Environment",
        "Framework :: CherryPy",
        "License :: OSI Approved :: Apache Software License",
        "Operating System :: POSIX :: Linux",
        "Programming Language :: JavaScript",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3 :: Only",
    ],
)
