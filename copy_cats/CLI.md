`pstree`

# file-systems
-------------

## list block devices (like hdd)
`lsblk`

## list partition tables and file system with boot indication
`sudo fdisk -lu`

## automatic mounting configuration
`cat /etc/fstab`

## check mounted volumes details
`sudo mount`

## mount a volume
`sudo mount /dev/sda1 /media/newhd`

## unmount by device or mount point
    sudo umount /dev/sda1
    sudo umount /media/newhd

## file system disk space usage
`df -h`

 
# terminal - http://ss64.com/bash/
-------------
    jobs                - see status of jobs / process run in current terminal.
    Ctrl + z            - pause job and send to background.
    bg                  - send process to background.
    disown              - detach process from terminal

    nohup foo.sh <script parameters> >& `log_file_name` &

    nohup               - continue proocess after logs off.
    >& `log_file_name`  - error & ouput to log file.
    &                   - fork process & run in background.

# search or find
-------------
    grep -R "test" /var/x/ #saecrh file content recursively
    grep -I "test" /var/x/ #skip binary files
    locate -i "<name>" #search index
    find /var/www7/  -type f -iname "*quote*" | grep ".txt" #search in folder
    find . -type f -iname "*.jsx" # find in current folder
    find ~ -type d -exec chmod +x {} \;
    find ~ -type f \( -iname '*.mp3' -o -iname '*.ogg' \) > mynewplaylist.m3u

### list subfolders
    du
    find . -type d

### check all files are copied --dry-run (-n) Use -z for network-compression, --exclude=*.amr

    rsync -avzP --dry-run --ignore-existing --exclude-from 'sync-exclude-list.txt' --log-file=rsyncNew.log ~/* midhun@192.168.0.103:~/ > ~/Desktop/syncOutput.txt
    rsync -anvP --ignore-existing /media/Ubuntu116GB-OS2/bin/ /media/My\ Passport/Ubuntu116GB-OS2/bin > op.txt
### && verify data integrity - http://unix.stackexchange.com/questions/109524/reasons-for-rsync-not-transfering-all-files

    ( cd /media/Ubuntu116GB-OS2/workSpace && find . -type f -exec md5sum {} \; ) > /home/mithoos/Documents/hholtmann.md5sum
    ( cd /media/My\ Passport/Ubuntu116GB-OS2/workSpace && md5sum -c /home/mithoos/Documents/hholtmann.md5sum )

## see file modification time
    stat -c '%y' file.txt
    date -d "@$(stat -c '%Y' file.txt)" '+%a %b %d %Y%t%R:%S:%N%t%Z(%:z)'

## get folder size
`du -hs  routes/`

## list DNS servers
`nmcli dev list iface eth0 | grep IP4`

## list connection on network
`arp -a`

## list only directories
`ls -la | grep ^d`

# Android

## set ANDROID_HOME
`export ANDROID_HOME=/opt/adt-bundle-linux-x86_64-20140702/sdk` 

***^ The folder which contains **tools** and **platform-tools** folders.***


## check password
`keytool -list -v -keystore .keystore`
## check signature/finger print
`keytool -list -v -keystore .keystore -storepass choco35 -alias jointly -keypass choco35`

## Cordova API
------------

    platforms/android/cordova/clean
    cordova build android --release -- --keystore="/path/to/keystore" --storePassword=password --alias=dupName
    adb install -r platforms/android/build/outputs/apk/android-release.apk
    adb shell am start -n org.sf.people/org.sf.people.MainActivity
    
## See Logs
``adb logcat | grep `adb shell ps | grep org.sf.people | cut -c10-15` ``

`adb logcat | grep "chromium"`


## phonegap API
------------

    curl -u phonegap@appsbusinesstore.com https://build.phonegap.com/api/v1/apps
    phonegap remote login -u phonegap@appsbusinesstore.com -p app2018app
    phonegap create toobler com.example.toobler HelloToobler
    phonegap [error] {"error":"app 885713 not found"}
    curl -u phonegap@appsbusinesstore.com -X DELETE https://build.phonegap.com/api/v1/apps/885759

# Safe user
-----------

https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps

`su - safeuser`


# SCP
---
    scp /var/www/abs.com/source/node_abs.zip azureuser@168.61.85.68:/var/www/

    scp remote_user@remote_host:/path/to/remote/file /path/to/local/file

    scp -i laksinEU.pem ubuntu@ec2-176-34-90-127.eu-west-1.compute.amazonaws.com:/var/www/abs.com/Dependencies/abs.zip /var/www/abs.com/Dependencies/MongoDB/dumps/email-Aswathy/abs.zip

    scp -i laksinEU.pem /var/www/abs.com/Dependencies/MongoDB/dumps/email-Aswathy/abs.zip ubuntu@ec2-176-34-90-127.eu-west-1.compute.amazonaws.com:/var/www/abs.com/Dependencies/abs.zip

    copy from server to local
    scp -i laksinEU.pem ubuntu@ec2-176-34-90-127.eu-west-1.compute.amazonaws.com:/etc/nginx/nginx.conf /home/toobler/Desktop/receive/nginx.conf....
    scp -i tropezcpa.pem ec2-user@ec2-54-88-8-200.compute-1.amazonaws.com:/home/ec2-user/tempDump/ad.zip /home/toobler/Desktop/advisorfiMongo.zip

# MySQL
-----
## import csv file
    mysqlimport --ignore-lines=1 \
                --fields-terminated-by=, \
                --verbose \
                --fields-enclosed-by='"' \
                --lines-terminated-by="\\n"\
                --local -u root \
                -p db_name \
                TABLE-NAME.csv

# Mongo
-----

    db.addUser('midhun', '192.168.2.49');
    db.auth('midhun', '192.168.2.49');

    db.sessions.update({platform_message:{ "$exists" : false }},{"$set":{"platform_message":"Great you know that already.."}},{multi:true})

## csv import

    mongoimport -d domainManagement -c domainList --type csv --file Domain_prices.csv  --headerline

    mongodump --host 127.0.0.1 -d development --port 27017 --username user --password pass --out /opt/backup/mongodump-2013-10-07-1
    mongodump -d dbname --out /home/ec2-user/tempDump/

    mongorestore  --drop --db abs --collection Localizations Localizations.bson
 
    mongorestore /path/to/dir/ --drop --db advisorfi #  Where `dir` contains all .json and .bson files.


## EMPTY (clear) file content*
 ----------------

    echo -n > YOURFILE
    cat /dev/null > YOURFILE
    shred -uvzn 0 file.ext
    sudo bash -c "> /var/log/mongodb/mongod.log" ## If you have no permission

## replalce text in file
----------------

    jq '.database.mongo.host = "127.0.0.1"' <<< cat ubuntu.json 
    cp development.json ubuntu.json
    sed -i 's/192.168.0.121/127.0.0.1/;s/192.168.0.28/127.0.0.1/' ubuntu.json

## SEE CHANGES AS IT HAPPENS
-------------------------

    tail -f /home/ubuntu/server/tomcat/logs/catalina.out

# CRON


    crontab -e
    */1 * * * * eval "export $(egrep -z DBUS_SESSION_BUS_ADDRESS /proc/$(pgrep -u $LOGNAME gnome-session)/environ)";/usr/bin/notify-send -i  appointment  -c "im" "Cron Working"
    crontab -l

# SSH

    ssh-copy-id toobler-ranjiba@192.168.2.42
    ssh 'toobler-ranjiba@192.168.2.42'
 
## X - execute at remote;
    ssh -X toobler@192.168.2.58 'DISPLAY=:0 notify-send -i /usr/share/icons/hicolor/32x32/apps/skype.png "Ajith -2.13: pls come"'

    ssh -X toobler@192.168.2.36 'sudo poweroff'

# SCREEN

    screen -ls
    screen -r id
    Ctrl + A + D


# ZIP
 ---

    zip zipname.zip -r folder_name
    unzip /var/www/temp/zipname.zip -d /var/www
    tar -xvzf community_images.tar.gz # x - extract; v - verbose; z - gzip; f - file
 
 ### list contents of a jar file
` jar tf file.jar`
 
 # SHELL
 -----
 
 ln [options] <target-file> <link-name>
 # s -symbolic_link; v - verbose; r - relative path
 ln -svr CLI.md CLI.txt
 
 # PORT
 -----
 lsof -t -i:4444
 
 # npm
 -----
 sudo npm cache clean -f
 sudo npm install -g n
 sudo n stable
 sudo n
 npm install node-ses --save -save-exact


 # chmod
 -----
 sudo chmod -R 100 *.*

# SYSTEM logs - shutdown and start up
-------------
last -x | grep shutdown
sudo nano /etc/default/bootlogd #set BOOTLOGD_ENABLE=Yes
cat /var/log/kern.log | grep "/proc/kmsg started"
cat /var/log/kern.log | grep "Kernel logging "

 # SHUTDOWN
 --------
 sudo poweroff
 sudo shutdown 18:30

# MISC
---

## Generate .pem file to login without password-
 http://askubuntu.com/a/644027/300767