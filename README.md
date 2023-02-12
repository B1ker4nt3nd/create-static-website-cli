https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e

- npm link

- npm unlink # No more command installed

### Gyakorlatban

Az `npm link` csinál valami npm install szerűt, és a user(`\Users\username\AppData\Roaming\npm\`) könyvtárba létrehoz egy linket ami utána globálisan elérhető mintha telepítettük volna a csomagot. A node_modules-ba linkeli a könyvátunkat.

Az `npm unlink` nekem nem működik, nem tudom miért. Az npm unlink végülis lefut a `\Users\username\AppData\Roaming\npm\` könyvtáron amit nagyon nem szabad, mert mindent uninstall-ál. Linket a korábban már említett könyvtáron lehet kitörölni, és azzal megszűnik. Én amit próbáltam az `npm unlink <package_name>` vagy `npm uninstall <package_name>` ezek nem működtek. Ha az npm unlink lefut eredményesen akkor kiírja, hogy hány csomagot törölt.
