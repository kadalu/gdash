# -*- coding: utf-8 -*-
"""
    gdash.setup.py

    :copyright: (c) 2014 by Aravinda VK
    :license: MIT, see LICENSE for more details.
"""

from setuptools import setup


setup(
    name="gdash",
    version="0.2",
    packages=["gdash"],
    include_package_data=True,
    install_requires=['argparse', 'flask', 'Flask-Cache'],
    entry_points={
        "console_scripts": [
            "gdash = gdash.app:main",
        ]
    },
    package_data={'gdash': ['dist/*.html',
                            'dist/*.txt',
                            'dist/*.xml',
                            'dist/assets/*.js',
                            'dist/assets/*.css',
                            'dist/assets/images/*.png',
                            'dist/assets/images/*.gif',
                            'fixtures/*.conf',
                            'fixtures/*.json']},
    platforms="linux",
    zip_safe=False,
    author="Aravinda VK",
    author_email="mail@aravindavk.in",
    description="GlusterFS Dashboard",
    license="MIT",
    keywords="glusterfs, gui, dashboard",
    url="https://github.com/aravindavk/gdash",
    long_description="""
    This tool is based on remote execution support provided by
    GlusterFS cli for `volume info` and `volume status` commands
    """,
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Topic :: Utilities",
        "Environment :: Console",
        "Environment :: Web Environment",
        "Framework :: Flask",
        "License :: OSI Approved :: MIT License",
        "Operating System :: POSIX :: Linux",
        "Programming Language :: JavaScript",
        "Programming Language :: Python",
        "Programming Language :: Python :: 2.6",
        "Programming Language :: Python :: 2.7",
        "Programming Language :: Python :: 2 :: Only"
    ],
)
