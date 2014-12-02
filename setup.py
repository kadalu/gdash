# -*- coding: utf-8 -*-
"""
    glusterdash.setup.py

    :copyright: (c) 2014 by Aravinda VK
    :license: MIT, see LICENSE for more details.
"""

from setuptools import setup


setup(
    name="GlusterFS Dashboard",
    version="0.1",
    packages=["glusterdash"],
    include_package_data=True,
    install_requires=['argparse', 'flask', 'Flask-Cache'],
    entry_points={
        "console_scripts": [
            "glusterdash = glusterdash.main:main",
        ]
    },
    package_data={'glusterdash': ['dist/*']},
    platforms="linux",
    zip_safe=False,
    author="Aravinda VK",
    author_email="mail@aravindavk.in",
    description="GlusterFS Dashboard",
    license="MIT",
    keywords="glusterfs, gui, dashboard",
    url="https://github.com/aravindavk/glusterdash",
)
