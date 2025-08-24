// knowledge.js
//
// 🔹 База знаний: 100+ ошибок Linux
// 🔹 Каждая запись — с объяснением, причиной, решением
// 🔹 Добавляй новые в конец с id: 101, 102...
// 🔹 Новые (с большим id) будут отображаться В НАЧАЛЕ

window.knowledgeData = [
  {
    id: 1,
    title: "Pacman: Failed to commit transaction (conflicting files)",
    content: "Эта ошибка появляется после команды 'pacman -Syu' в Arch Linux. Она означает, что два пакета пытаются записать в один и тот же файл. Часто возникает после долгого перерыва в обновлениях или при установке AUR-пакетов.",
    solution: "sudo pacman -Syu --overwrite '*'\n# Если не помогает — укажите конкретный файл:\nsudo pacman -Syu --overwrite '/usr/bin/конфликтный-файл'",
    tags: ["arch", "pacman", "ошибка", "обновление", "конфликт файлов"]
  },
  {
    id: 2,
    title: "Pacman: Failed to initialize alpm library",
    content: "Ошибка означает, что менеджер пакетов не может получить доступ к своей базе данных. Чаще всего возникает, если система была выключена во время обновления, или если файл блокировки остался. Файл /var/lib/pacman/db.lck мешает работе.",
    solution: "sudo rm /var/lib/pacman/db.lck\nsudo pacman -Sy\n# Если повреждена база:\nsudo pacman -Syyu",
    tags: ["arch", "pacman", "db.lck", "ошибка базы данных"]
  },
  {
    id: 3,
    title: "Звук не работает: PulseAudio не запускается",
    content: "После обновления или перезагрузки звук может пропасть. Приложение 'pactl info' показывает, что сервер не работает. Это часто происходит из-за сбоя PulseAudio или отсутствия демона. Новички могут подумать, что сломалась звуковая карта, но это программная проблема.",
    solution: "pulseaudio -k\npulseaudio --start\n# Или перезапустите демон:\nsudo systemctl --user restart pulseaudio.service",
    tags: ["звук", "pulseaudio", "alsa", "арч", "дебиан"]
  },
  {
    id: 4,
    title: "GRUB не загружается после обновления ядра",
    content: "После обновления ядра в Debian/Ubuntu система зависает на чёрном экране. BIOS/UEFI не видит загрузчик. Проблема в том, что GRUB не был переустановлен на диск. Это частая ошибка после ручного обновления или сбоя установки.",
    solution: "sudo update-grub\nsudo grub-install /dev/sda\n# Проверьте, где установлен BIOS/UEFI:\nsudo fdisk -l",
    tags: ["grub", "debian", "ubuntu", "ядро", "загрузка", "не загружается"]
  },
  {
    id: 5,
    title: "Dnf: Failed to synchronize cache for repo",
    content: "В Fedora команда dnf update выдаёт ошибку синхронизации. Это может быть из-за устаревших репозиториев, проблем с сетью или повреждённого кэша. Новички часто паникуют, думая, что сломана система, но это легко исправить.",
    solution: "sudo dnf clean all\nsudo dnf makecache\nsudo dnf update\n# Если проблема с GPG:\nsudo dnf update --nogpgcheck",
    tags: ["fedora", "dnf", "репозиторий", "ошибка сети", "кэш"]
  },
  {
    id: 6,
    title: "Не запускается startx: command not found",
    content: "Вы установили минимальный Arch или Debian и пытаетесь запустить графическую среду, но команда startx не найдена. Это значит, что X-сервер не установлен. Новички могут подумать, что система не поддерживает GUI, но просто нужно установить пакеты.",
    solution: "sudo pacman -S xorg-server xorg-xinit xorg-apps\n# Для Debian:\nsudo apt install xserver-xorg-core xinit\n# Затем:\nstartx",
    tags: ["xorg", "startx", "арч", "дебиан", "графика"]
  },
  {
    id: 7,
    title: "Wi-Fi не работает: No Wi-Fi adapter found",
    content: "Система не видит Wi-Fi адаптер. Часто встречается на ноутбуках с чипами Realtek, MEDIATEK или Broadcom. Причина — отсутствие проприетарных драйверов. Новички думают, что сломан адаптер, но это решается установкой firmware.",
    solution: "sudo pacman -S linux-firmware\n# Для Realtek:\nsudo pacman -S rtl88xxau-aircrack-dkms\n# Для Debian:\nsudo apt install firmware-realtek firmware-misc-nonfree",
    tags: ["wifi", "драйверы", "firmware", "арч", "дебиан", "ноутбук"]
  },
  {
    id: 8,
    title: "GPG error: The following signatures couldn't be verified",
    content: "При запуске 'apt update' в Debian/Ubuntu появляется ошибка проверки подписей. Это не критично, но мешает обновлению пакетов. Причина — устаревшие ключи или повреждённый ключевой архив. Новички боятся, что система взломана, но это просто техническая ошибка.",
    solution: "sudo apt update --fix-missing\nsudo apt install debian-keyring debian-archive-keyring\ngpg --recv-keys [ключ из ошибки]\ngpg --export --armor [ключ] | sudo apt-key add -",
    tags: ["gpg", "debian", "apt", "ошибка ключа", "обновление"]
  },
  {
    id: 9,
    title: "Ошибка монтирования: wrong fs type, bad option, bad superblock",
    content: "Вы пытаетесь смонтировать диск (внешний, SSD, раздел), но система говорит, что файловая система повреждена. Возможно, диск был извлечён без безопасного отключения. Новички думают, что диск умер, но часто его можно восстановить.",
    solution: "sudo fsck /dev/sdb1\n# Замените sdb1 на нужный раздел\n# Если ext4:\nsudo fsck.ext4 -f /dev/sdb1\n# Затем:\nsudo mount /dev/sdb1 /mnt",
    tags: ["fsck", "монтирование", "ошибка диска", "ext4", "повреждение"]
  },
  {
    id: 10,
    title: "DNS не работает: ping по IP работает, а по домену — нет",
    content: "Вы можете пинговать 8.8.8.8, но google.com не открывается. Проблема в DNS-резолвинге. systemd-resolved может быть сломан или не настроен. Новички думают, что нет интернета, но дело в имени хоста.",
    solution: "sudo systemctl restart systemd-resolved\n# Проверьте:\nsystemd-resolve --status\n# Временно:\necho 'nameserver 8.8.8.8' | sudo tee /etc/resolv.conf",
    tags: ["dns", "systemd", "ошибка сети", "resolved", "ping"]
  },
  {
    id: 11,
    title: "Не хватает места в /boot",
    content: "При обновлении ядра в Ubuntu/Debian вы получаете ошибку 'No space left on device' в /boot. Это происходит, когда старые ядра не удаляются автоматически. Новички не знают, как чистить /boot, и боятся удалить что-то важное.",
    solution: "sudo apt autoremove --purge\n# Или вручную:\ndpkg --list | grep linux-image\nsudo apt remove --purge linux-image-5.4.0-XX-generic",
    tags: ["boot", "не хватает места", "ядро", "ubuntu", "очистка"]
  },
  {
    id: 12,
    title: "Ошибка: /etc/resolv.conf: Read-only file system",
    content: "Вы пытаетесь изменить DNS, но файл только для чтения. Это потому, что resolv.conf управляется systemd-resolved или NetworkManager. Новички пытаются принудительно записать, но получают ошибку.",
    solution: "sudo mount -o remount,rw /\nsudo nano /etc/resolv.conf\n# Или отключите управление:\nsudo systemctl stop systemd-resolved",
    tags: ["resolv.conf", "read-only", "dns", "systemd", "ошибка"]
  },
  {
    id: 13,
    title: "Температура CPU слишком высокая",
    content: "Система перегревается, вентилятор шумит. Это может быть из-за плохого охлаждения, отсутствия драйверов или фоновых процессов. Новички не знают, как проверить температуру или управлять частотой.",
    solution: "sudo pacman -S lm_sensors psensor\nsensors\n# Управление частотой:\nsudo pacman -S cpupower\ncpupower frequency-set -g powersave",
    tags: ["температура", "cpu", "охлаждение", "lm_sensors", "арч"]
  },
  {
    id: 14,
    title: "Не работает Bluetooth",
    content: "Bluetooth-устройства не обнаруживаются. Адаптер есть, но не работает. Часто из-за отсутствия драйверов или остановленного сервиса. Новички думают, что нет поддержки, но это решается включением сервиса.",
    solution: "sudo systemctl start bluetooth\nsudo systemctl enable bluetooth\n# Драйверы:\nsudo pacman -S bluez bluez-utils",
    tags: ["bluetooth", "арч", "драйвер", "не работает"]
  },
  {
    id: 15,
    title: "Ошибка: Failed to load module 'v4l2' (module does not exist)",
    content: "При запуске приложений с веб-камерой (Zoom, Skype) появляется ошибка. Модуль ядра не загружен. Новички не знают, что это модуль ядра и как его установить.",
    solution: "sudo modprobe v4l2loopback\n# Установите модуль:\nsudo pacman -S v4l2loopback-dkms",
    tags: ["веб-камера", "v4l2", "модуль", "zoom", "ошибка"]
  },
  {
    id: 16,
    title: "Не работает мышь или клавиатура в X",
    content: "Графическая среда запускается, но ввод не работает. Это может быть связано с отсутствием драйверов для input-устройств. Новички перезагружаются, но проблема остаётся.",
    solution: "sudo pacman -S xf86-input-libinput\n# В /etc/X11/xorg.conf.d/10-input.conf:\nSection \"InputClass\"\n  Identifier \"evdev pointer catchall\"\n  MatchIsPointer \"on\"\n  Driver \"libinput\"\nEndSection",
    tags: ["мышь", "клавиатура", "xorg", "ввод", "драйвер"]
  },
  {
    id: 17,
    title: "Ошибка: 'No space left on device' при наличии свободного места",
    content: "Команда df показывает свободное место, но вы не можете создать файл. Причина — закончились inodes. Новички не знают, что такое inodes, и думают, что диск полон.",
    solution: "df -i  # проверить inodes\n# Найти мусор:\nsudo find / -xdev -type f | cut -d \"/\" -f 2 | sort | uniq -c | sort -nr",
    tags: ["no space", "inodes", "df", "ошибка", "очистка"]
  },
  {
    id: 18,
    title: "Не запускается Docker: 'Cannot connect to the Docker daemon'",
    content: "Docker установлен, но команды docker не работают. Сервис не запущен или пользователь не в группе docker. Новички не знают, что нужно добавить пользователя в группу.",
    solution: "sudo systemctl start docker\nsudo systemctl enable docker\nsudo usermod -aG docker $USER\n# Перезайдите в систему",
    tags: ["docker", "daemon", "не запускается", "service", "арч"]
  },
  {
    id: 19,
    title: "Ошибка: 'bash: command not found' для всех команд",
    content: "После входа в терминал ни одна команда не работает. Это значит, что переменная PATH повреждена. Новички думают, что сломана система, но можно временно починить.",
    solution: "export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\n# Проверьте ~/.bashrc и /etc/environment",
    tags: ["bash", "command not found", "PATH", "ошибка", "оболочка"]
  },
  {
    id: 20,
    title: "Не работает сеть: 'Network is unreachable'",
    content: "Система не видит сеть. IP нет, пинг не проходит. Возможно, сетевой интерфейс выключен. Новички не знают, как проверить состояние интерфейса.",
    solution: "ip link\nsudo ip link set enp3s0 up\nsudo dhcpcd enp3s0",
    tags: ["сеть", "unreachable", "ip", "интерфейс", "арч"]
  },
  {
    id: 21,
    title: "Ошибка при обновлении: 'Could not resolve archive.ubuntu.com'",
    content: "Не удаётся обновить систему из-за DNS-проблем. Решение — сменить DNS или использовать зеркало. Новички часто думают, что нет интернета, но проблема в разрешении имён.",
    solution: "sudo nano /etc/apt/sources.list\n# Замените на зеркало, например:\ndeb http://ru.archive.ubuntu.com/ubuntu/ focal main",
    tags: ["ubuntu", "ошибка обновления", "dns", "зеркало", "sources.list"]
  },
  {
    id: 22,
    title: "Не работает HDMI-аудио",
    content: "Звук есть через наушники, но не через HDMI-телевизор. Нужно выбрать правильный вывод в PulseAudio. Новички не знают, где менять выходное устройство.",
    solution: "pavucontrol\n# Во вкладке 'Выходное устройство' выберите HDMI\n# Или:\npacmd set-sink-port alsa_output.pci-0000_01.00.1.hdmi-stereo-extra1",
    tags: ["hdmi", "звук", "pavucontrol", "арч", "аудио"]
  },
  {
    id: 23,
    title: "Ошибка: 'You are in emergency mode'",
    content: "Система загружается в emergency mode. Причина — ошибка монтирования корневого раздела или повреждение fstab. Новички паникуют, но можно починить через редактирование fstab.",
    solution: "journalctl -xb\n# Проверьте /etc/fstab\n# Закомментируйте проблемные строки\n# Перезагрузитесь",
    tags: ["emergency mode", "fstab", "ошибка загрузки", "journalctl"]
  },
  {
    id: 24,
    title: "Не работает suspend (режим сна)",
    content: "Система не засыпает или сразу просыпается. Часто из-за USB-устройств или драйверов. Новички не знают, как проверить, что мешает сну.",
    solution: "sudo nano /etc/systemd/logind.conf\n# Раскомментируйте:\nHandleLidSwitch=suspend\n# Перезапустите:\nsudo systemctl restart systemd-logind",
    tags: ["suspend", "сно", "lid", "режим", "не работает"]
  },
  {
    id: 25,
    title: "Ошибка: 'Failed to start Light Display Manager'",
    content: "После установки графики DM не запускается. Возможно, неправильный конфиг X или отсутствуют драйверы. Новички не знают, как проверить логи.",
    solution: "sudo pacman -S xorg-server xorg-drivers\n# Для NVIDIA:\nsudo pacman -S nvidia nvidia-utils\n# Перезагрузитесь",
    tags: ["lightdm", "gdm", "sddm", "не запускается", "графика"]
  },
  {
    id: 26,
    title: "Не работает буфер обмена в терминале",
    content: "Выделение текста не копируется. В терминале нужно включить 'Mouse Highlight' или использовать Shift+Insert. Новички не знают, как копировать в терминале.",
    solution: "В настройках терминала включите 'Copy on select'\n# Или используйте:\nShift + Insert — вставить\nCtrl+Shift+C — копировать",
    tags: ["буфер", "копирование", "терминал", "выделение", "mouse"]
  },
  {
    id: 27,
    title: "Ошибка: 'modprobe: FATAL: Module not found'",
    content: "Вы пытаетесь загрузить модуль ядра, но он не найден. Модуль не установлен или имя неверное. Новички не знают, где искать модули.",
    solution: "find /lib/modules/$(uname -r) -type f -name '*.ko*' | grep имя_модуля\n# Установите пакет с модулем, например:\nsudo pacman -S linux-headers",
    tags: ["modprobe", "модуль", "ядро", "ошибка", "не найден"]
  },
  {
    id: 28,
    title: "Не работает touchpad",
    content: "Тачпад не реагирует. Часто после обновления. Нужно установить драйверы. Новички думают, что сломано железо.",
    solution: "sudo pacman -S xf86-input-synaptics\n# Или для новых тачпадов:\nsudo pacman -S xf86-input-libinput",
    tags: ["touchpad", "тачпад", "не работает", "драйвер", "арч"]
  },
  {
    id: 29,
    title: "Ошибка: 'Permission denied' при записи на USB",
    content: "Вы не можете скопировать файлы на флешку. Проблема с правами или файловой системой. Новички не знают, как перемонтировать с правами.",
    solution: "sudo chmod 777 /run/media/$USER/FLASH\n# Или перемонтируйте с правами:\nsudo mount -o remount,uid=1000,gid=1000 /dev/sdb1",
    tags: ["usb", "права", "permission denied", "chmod", "монтирование"]
  },
  {
    id: 30,
    title: "Не работает sudo: 'user is not in the sudoers file'",
    content: "Пользователь не может использовать sudo. Нужно добавить его в группу wheel (Arch) или sudo (Debian). Новички не могут ничего установить.",
    solution: "su -\nusermod -aG wheel username  # Arch\nusermod -aG sudo username   # Debian/Ubuntu",
    tags: ["sudo", "права", "wheel", "sudoers", "ошибка"]
  },
  {
    id: 31,
    title: "Ошибка: 'No bootable device found'",
    content: "Система не видит загрузочный диск. BIOS/UEFI не находит носитель. Новички думают, что сломался диск, но нужно проверить порядок загрузки.",
    solution: "Зайдите в BIOS/UEFI (Del/F2/F12)\nУстановите USB или диск первым в списке загрузки",
    tags: ["загрузка", "boot", "bios", "uefi", "не загружается"]
  },
  {
    id: 32,
    title: "Не работает Ethernet: 'No link detected'",
    content: "Кабель подключён, но система не видит сеть. Возможно, отключён интерфейс или не работает драйвер. Новички не знают, как проверить физическое соединение.",
    solution: "ip link\nsudo ip link set enp2s0 up\n# Проверьте кабель и роутер",
    tags: ["ethernet", "сеть", "no link", "интерфейс"]
  },
  {
    id: 33,
    title: "Ошибка: 'Out of memory: Killed process'",
    content: "Система убивает процесс из-за нехватки памяти. Новички не понимают, почему приложение закрывается само.",
    solution: "free -h\n# Добавьте swap:\nsudo fallocate -l 2G /swapfile\nsudo chmod 600 /swapfile\nsudo mkswap /swapfile\nsudo swapon /swapfile",
    tags: ["память", "oom", "swap", "killed", "ошибка"]
  },
  {
    id: 34,
    title: "Не запускается Firefox: 'Profile missing or corrupt'",
    content: "Firefox не запускается, пишет, что профиль повреждён. Новички боятся потерять закладки, но профиль можно восстановить.",
    solution: "firefox --safe-mode\n# Или переименуйте профиль:\nmv ~/.mozilla ~/.mozilla.backup",
    tags: ["firefox", "ошибка", "профиль", "не запускается"]
  },
  {
    id: 35,
    title: "Ошибка: 'Filesystem readonly, re mounting read-only'",
    content: "Файловая система смонтирована только для чтения. Часто после сбоя. Новички не могут ничего сохранить.",
    solution: "sudo mount -o remount,rw /\nsudo fsck /dev/sda1",
    tags: ["readonly", "fsck", "ошибка", "ремонт"]
  },
  {
    id: 36,
    title: "Не работает печать: 'No default printer'",
    content: "Принтер подключён, но система не видит его. Нужно настроить CUPS. Новички не знают, как добавить принтер.",
    solution: "sudo systemctl start cups\nsudo systemctl enable cups\n# Откройте: http://localhost:631",
    tags: ["печать", "cups", "принтер", "не работает"]
  },
  {
    id: 37,
    title: "Ошибка: 'Segmentation fault (core dumped)'",
    content: "Программа аварийно завершается. Это означает обращение к недоступной памяти. Новички не знают, что делать.",
    solution: "strace имя_программы\n# Переустановите программу:\nsudo pacman -S имя\n# Или обновите систему",
    tags: ["segfault", "ошибка", "core dumped", "отладка"]
  },
  {
    id: 38,
    title: "Не работает Bluetooth-гарнитура",
    content: "Гарнитура подключается, но звук идёт через динамики. Нужно вручную выбрать устройство. Новички не знают, где менять профиль.",
    solution: "pavucontrol\n# Во вкладке 'Настройка вывода' выберите 'Выход A2DP'",
    tags: ["bluetooth", "гарнитура", "звук", "a2dp"]
  },
  {
    id: 39,
    title: "Ошибка: 'Invalid or corrupted package'",
    content: "Pacman не может установить пакет из-за повреждённого архива. Часто после обрыва сети.",
    solution: "sudo rm /var/cache/pacman/pkg/имя_пакета*\nsudo pacman -S имя_пакета",
    tags: ["pacman", "ошибка", "пакет", "corrupted"]
  },
  {
    id: 40,
    title: "Не работает яркость экрана",
    content: "Кнопки яркости не работают. Часто на ноутбуках. Нужно добавить параметр ядра.",
    solution: "sudo nano /etc/default/grub\n# Добавьте в GRUB_CMDLINE_LINUX:\nacpi_backlight=vendor\n# Обновите:\nsudo update-grub",
    tags: ["яркость", "экран", "ноутбук", "acpi"]
  },
  {
    id: 41,
    title: "Ошибка: 'Failed to load module 'nv' (module does not exist, 0)'",
    content: "X-сервер не может загрузить драйвер NVIDIA. Часто после обновления ядра.",
    solution: "sudo pacman -S nvidia nvidia-utils\n# Пересоберите initramfs:\nsudo mkinitcpio -P",
    tags: ["nvidia", "драйвер", "xorg", "ошибка"]
  },
  {
    id: 42,
    title: "Не работает Caps Lock как Ctrl",
    content: "Вы настроили Caps Lock как Ctrl, но не работает. Нужно применить настройки.",
    solution: "setxkbmap -layout us -option ctrl:nocaps\n# Для постоянства добавьте в ~/.xprofile",
    tags: ["caps lock", "ctrl", "клавиатура", "xorg"]
  },
  {
    id: 43,
    title: "Ошибка: 'System boot order not found'",
    content: "UEFI не может найти загрузчик. Часто после установки Arch или сбоя.",
    solution: "Войдите в UEFI\nУстановите 'OS Boot Manager' первым\nИли перезапишите EFI:\nsudo grub-install --target=x86_64-efi --efi-directory=/boot/efi",
    tags: ["uefi", "boot", "efi", "grub"]
  },
  {
    id: 44,
    title: "Не работает звук в браузере",
    content: "Звук есть в других приложениях, но не в браузере. Часто из-за PulseAudio.",
    solution: "pactl list sinks\npactl move-sink-input <номер> <выход>\n# Или перезапустите браузер",
    tags: ["звук", "браузер", "pulseaudio", "не работает"]
  },
  {
    id: 45,
    title: "Ошибка: 'Failed to start User Manager for UID'",
    content: "Ошибка при входе в систему. Связана с systemd и пользовательскими сервисами.",
    solution: "sudo loginctl enable-linger $USER",
    tags: ["systemd", "ошибка", "loginctl", "linger"]
  },
  {
    id: 46,
    title: "Не работает скролл на touchpad",
    content: "Двигаешь пальцем, но страница не скроллится. Нужно включить в настройках.",
    solution: "В 'Настройки мыши и тачпада' включите 'Двигайте двумя пальцами для скролла'",
    tags: ["touchpad", "скролл", "не работает", "два пальца"]
  },
  {
    id: 47,
    title: "Ошибка: 'Could not get lock /var/lib/dpkg/lock'",
    content: "APT не может установить пакет, потому что другой процесс уже использует менеджер.",
    solution: "sudo rm /var/lib/dpkg/lock\nsudo dpkg --configure -a",
    tags: ["apt", "dpkg", "блокировка", "ошибка"]
  },
  {
    id: 48,
    title: "Не работает Wi-Fi на старом ноутбуке",
    content: "Адаптер есть, но не подключается. Часто из-за устаревшего драйвера.",
    solution: "sudo pacman -S firmware-iwlwifi\nsudo modprobe -r iwlwifi\nsudo modprobe iwlwifi",
    tags: ["wifi", "iwlwifi", "драйвер", "ноутбук"]
  },
  {
    id: 49,
    title: "Ошибка: 'GRUB loading error'",
    content: "GRUB не может загрузиться. Часто после сбоя или неправильного обновления.",
    solution: "Загрузитесь с Live USB\nsudo mount /dev/sdaX /mnt\nsudo mount --bind /dev /mnt/dev\nsudo mount --bind /proc /mnt/proc\nsudo mount --bind /sys /mnt/sys\nsudo chroot /mnt\ngrub-install /dev/sda\nupdate-grub",
    tags: ["grub", "ошибка", "загрузка", "chroot"]
  },
  {
    id: 50,
    title: "Не работает Bluetooth-мышь",
    content: "Мышь подключается, но не работает. Нужно перезагрузить Bluetooth.",
    solution: "sudo systemctl restart bluetooth\nbluetoothctl\nconnect [MAC-адрес]",
    tags: ["bluetooth", "мышь", "не работает", "mac"]
  },
    {
    id: 51,
    title: "GRUB: error: disk 'hd0,msdos1' not found",
    content: "После обновления Arch Linux GRUB не может найти загрузочный раздел. Часто из-за смены UUID или повреждения конфига. Новички паникуют, думая, что диск умер.",
    solution: "Загрузитесь с Live USB\nsudo mount /dev/sdaX /mnt\nsudo arch-chroot /mnt\ngrub-install /dev/sda\ngrub-mkconfig -o /boot/grub/grub.cfg",
    tags: ["arch", "grub", "загрузка", "uuid", "не найден"]
  },
  {
    id: 52,
    title: "Ядро обновилось, но NVIDIA драйвер не работает",
    content: "После обновления ядра NVIDIA драйвер перестаёт работать. Это происходит, потому что модуль ядра не совместим с новым ядром. Нужно пересобрать initramfs.",
    solution: "sudo pacman -S linux-headers nvidia-dkms\nsudo mkinitcpio -P\nsudo grub-mkconfig -o /boot/grub/grub.cfg",
    tags: ["arch", "nvidia", "ядро", "dkms", "драйвер"]
  },
  {
    id: 53,
    title: "Сломался GNOME после обновления",
    content: "GNOME не запускается, чёрный экран или ошибка 'Oh no! Something has gone wrong'. Часто после обновления пакетов. Причина — конфликт версий или повреждённые конфиги.",
    solution: "sudo pacman -Syu\n# Удалите конфиги:\nrm -rf ~/.config/gnome*\n# Пересоздайте сессию:\nsudo systemctl restart gdm",
    tags: ["arch", "gnome", "ошибка", "обновление", "gdm"]
  },
  {
    id: 54,
    title: "Ошибка: Failed to start Switch Root",
    content: "Система зависает на 'Failed to start Switch Root'. Часто после обновления initramfs. Причина — повреждённый образ или отсутствующие модули.",
    solution: "Загрузитесь с Live USB\nsudo mount /dev/sdaX /mnt\nsudo arch-chroot /mnt\nmkinitcpio -P\ngrub-mkconfig -o /boot/grub/grub.cfg",
    tags: ["arch", "initramfs", "switch root", "загрузка"]
  },
  {
    id: 55,
    title: "Pacman: signature from '...' is unknown trust",
    content: "Pacman не может проверить подпись пакета. Часто после смены ключей или сбоя времени. Новички думают, что пакет вирусный.",
    solution: "sudo pacman -Sy archlinux-keyring\nsudo pacman -Syyu",
    tags: ["arch", "pacman", "подпись", "ключ", "trust"]
  },
  {
    id: 56,
    title: "Не запускается Xorg: no screens found",
    content: "Xorg не может найти дисплей. Часто после обновления драйверов или смены видеокарты. Нужно проверить конфиг xorg.conf.",
    solution: "sudo pacman -S xorg-server xorg-drivers\n# Удалите старый конфиг:\nsudo rm /etc/X11/xorg.conf\nstartx",
    tags: ["arch", "xorg", "no screens", "драйвер", "экран"]
  },
  {
    id: 57,
    title: "Ошибка: Failed to load module 'nvidia' (module does not exist)",
    content: "Xorg не может загрузить модуль NVIDIA. Часто после обновления ядра. Нужно переустановить драйвер.",
    solution: "sudo pacman -S nvidia nvidia-utils\nsudo mkinitcpio -P",
    tags: ["arch", "nvidia", "модуль", "xorg", "ошибка"]
  },
  {
    id: 58,
    title: "Не работает Wi-Fi после обновления ядра",
    content: "Wi-Fi адаптер перестал работать после обновления ядра. Причина — отсутствие модуля в новом ядре. Нужно установить firmware.",
    solution: "sudo pacman -S linux-firmware\n# Перезагрузите модуль:\nsudo modprobe -r iwlmvm\nsudo modprobe iwlmvm",
    tags: ["arch", "wifi", "ядро", "firmware", "iwlmvm"]
  },
  {
    id: 59,
    title: "Ошибка: Failed to start Session c1 of user",
    content: "systemd не может запустить пользовательскую сессию. Часто из-за повреждённых пользовательских сервисов или .Xauthority.",
    solution: "rm ~/.Xauthority\nsudo systemctl restart display-manager",
    tags: ["arch", "systemd", "сессия", "ошибка", "display-manager"]
  },
  {
    id: 60,
    title: "Не работает звук после обновления PulseAudio",
    content: "Звук пропал после обновления PulseAudio. Причина — конфликт конфигов или отсутствие модуля.",
    solution: "rm -rf ~/.config/pulse\npulseaudio -k\npulseaudio --start",
    tags: ["arch", "звук", "pulseaudio", "обновление", "конфликт"]
  },
  {
    id: 61,
    title: "Ошибка: Failed to load module 'freetype' (module does not exist)",
    content: "Xorg не может загрузить модуль freetype. Часто после обновления xorg-server. Нужно переустановить пакет.",
    solution: "sudo pacman -S freetype2\nsudo pacman -S xorg-server",
    tags: ["arch", "xorg", "freetype", "модуль", "ошибка"]
  },
  {
    id: 62,
    title: "Не запускается KDE Plasma",
    content: "KDE не запускается, чёрный экран или ошибка 'Could not start D-Bus'. Часто после обновления. Причина — повреждённые конфиги или отсутствие сервисов.",
    solution: "sudo pacman -Syu\nrm -rf ~/.config/plasma*\n# Перезапустите:\nsudo systemctl restart sddm",
    tags: ["arch", "kde", "plasma", "dbus", "sddm"]
  },
  {
    id: 63,
    title: "Ошибка: Failed to start Load Kernel Modules",
    content: "systemd не может загрузить модули ядра. Часто после обновления или ручного изменения /etc/modules-load.d/.",
    solution: "sudo nano /etc/modules-load.d/*.conf\n# Удалите проблемные модули\nsudo systemctl daemon-reload",
    tags: ["arch", "systemd", "модули", "ядро", "ошибка"]
  },
  {
    id: 64,
    title: "Не работает Bluetooth после обновления",
    content: "Bluetooth адаптер не обнаруживается после обновления. Причина — отсутствие модуля или остановленный сервис.",
    solution: "sudo modprobe btusb\nsudo systemctl start bluetooth\nsudo systemctl enable bluetooth",
    tags: ["arch", "bluetooth", "btusb", "обновление", "сервис"]
  },
  {
    id: 65,
    title: "Ошибка: Failed to start Apply Kernel Variables",
    content: "systemd не может применить настройки ядра. Часто из-за ошибок в /etc/sysctl.d/.",
    solution: "sudo nano /etc/sysctl.d/*.conf\n# Исправьте ошибки\nsudo sysctl --system",
    tags: ["arch", "systemd", "sysctl", "ядро", "ошибка"]
  },
  {
    id: 66,
    title: "Не работает suspend после обновления ядра",
    content: "Система не засыпает или сразу просыпается. Часто из-за отсутствия модулей или конфликтов.",
    solution: "sudo nano /etc/default/grub\n# Добавьте в GRUB_CMDLINE_LINUX:\nmem_sleep_default=deep\n# Обновите:\nsudo grub-mkconfig -o /boot/grub/grub.cfg",
    tags: ["arch", "suspend", "ядро", "grub", "mem_sleep"]
  },
  {
    id: 67,
    title: "Ошибка: Failed to start Network Manager",
    content: "NetworkManager не запускается. Часто после обновления или конфликта с dhcpcd.",
    solution: "sudo systemctl stop dhcpcd\nsudo systemctl start NetworkManager\nsudo systemctl enable NetworkManager",
    tags: ["arch", "networkmanager", "dhcpcd", "ошибка", "сервис"]
  },
  {
    id: 68,
    title: "Не работает touchpad после обновления Xorg",
    content: "Тачпад не реагирует после обновления Xorg. Причина — отсутствие драйвера или неправильная конфигурация.",
    solution: "sudo pacman -S xf86-input-libinput\n# Перезапустите Xorg",
    tags: ["arch", "touchpad", "xorg", "libinput", "драйвер"]
  },
  {
    id: 69,
    title: "Ошибка: Failed to start Login Service",
    content: "systemd-logind не запускается. Часто из-за повреждённых конфигов или конфликта с другими сервисами.",
    solution: "sudo systemctl status systemd-logind\nsudo systemctl restart systemd-logind",
    tags: ["arch", "systemd", "logind", "ошибка", "сервис"]
  },
  {
    id: 70,
    title: "Не работает USB после обновления ядра",
    content: "USB порты не работают. Причина — отсутствие модулей ядра или повреждение initramfs.",
    solution: "sudo mkinitcpio -P\nsudo modprobe usbcore\nsudo modprobe xhci_hcd",
    tags: ["arch", "usb", "ядро", "модуль", "initramfs"]
  },
  {
    id: 71,
    title: "Ошибка: Failed to start Time Synchronization",
    content: "systemd-timesyncd не может синхронизировать время. Часто из-за отсутствия интернета или блокировки NTP.",
    solution: "sudo systemctl restart systemd-timesyncd\nsudo timedatectl set-ntp true",
    tags: ["arch", "время", "timesyncd", "ntp", "ошибка"]
  },
  {
    id: 72,
    title: "Не работает Plymouth (сплеш-экран)",
    content: "Сплеш-экран не отображается при загрузке. Причина — отсутствие в initramfs или неправильная конфигурация.",
    solution: "sudo pacman -S plymouth\nsudo mkinitcpio -P\nsudo plymouth-set-default-theme spinner",
    tags: ["arch", "plymouth", "сплеш", "initramfs", "загрузка"]
  },
  {
    id: 73,
    title: "Ошибка: Failed to start Disk Manager",
    content: "udisks2 не запускается. Часто после обновления или конфликта с правами.",
    solution: "sudo systemctl restart udisks2\nsudo usermod -aG storage $USER",
    tags: ["arch", "udisks2", "диск", "ошибка", "сервис"]
  },
  {
    id: 74,
    title: "Не работает монтирование NTFS",
    content: "NTFS диск не монтируется. Причина — отсутствие ntfs-3g или повреждённый диск.",
    solution: "sudo pacman -S ntfs-3g\nsudo mount -t ntfs-3g /dev/sdb1 /mnt",
    tags: ["arch", "ntfs", "монтирование", "ntfs-3g", "диск"]
  },
  {
    id: 75,
    title: "Ошибка: Failed to start Firewall",
    content: "ufw или firewalld не запускается. Часто из-за конфликта правил или отсутствия пакета.",
    solution: "sudo pacman -S ufw\nsudo ufw enable\nsudo systemctl start ufw",
    tags: ["arch", "firewall", "ufw", "ошибка", "безопасность"]
  },
    {
    id: 76,
    title: "Не работает Wi-Fi после сна (suspend)",
    content: "Wi-Fi не подключается после выхода из сна. Часто из-за драйвера или отключения модуля.",
    solution: "sudo modprobe -r iwlmvm\nsudo modprobe iwlmvm\n# Или перезапустите NetworkManager:\nsudo systemctl restart NetworkManager",
    tags: ["arch", "wifi", "suspend", "iwlmvm", "networkmanager"]
  },
  {
    id: 77,
    title: "Ошибка: Failed to start Hardware RNG Entropy Gatherer",
    content: "Служба rng-tools не запускается. Часто из-за отсутствия аппаратного генератора энтропии.",
    solution: "sudo pacman -S rng-tools\nsudo systemctl enable rngd\nsudo systemctl start rngd",
    tags: ["arch", "rng", "энтропия", "rngd", "ошибка"]
  },
  {
    id: 78,
    title: "Не работает Bluetooth после сна",
    content: "Bluetooth устройства не подключаются после сна. Причина — отключение адаптера.",
    solution: "sudo systemctl restart bluetooth\n# Или перезагрузите модуль:\nsudo modprobe -r btusb\nsudo modprobe btusb",
    tags: ["arch", "bluetooth", "suspend", "btusb", "не подключается"]
  },
  {
    id: 79,
    title: "Ошибка: Failed to start Load/Save Random Seed",
    content: "systemd не может сохранить состояние энтропии. Часто из-за отсутствия /var/lib/systemd/random-seed.",
    solution: "sudo touch /var/lib/systemd/random-seed\nsudo chmod 600 /var/lib/systemd/random-seed\nsudo systemctl daemon-reload",
    tags: ["arch", "systemd", "random", "seed", "ошибка"]
  },
  {
    id: 80,
    title: "Не работает звук в Firefox после обновления",
    content: "Firefox не воспроизводит звук, хотя в других приложениях звук есть. Причина — конфликт с PulseAudio.",
    solution: "pavucontrol\n# В 'Воспроизведение' выберите Firefox и установите правильный выход",
    tags: ["arch", "звук", "firefox", "pulseaudio", "не работает"]
  },
  {
    id: 81,
    title: "Ошибка: Failed to start User Manager for UID 1000",
    content: "systemd-user не запускается для пользователя. Часто из-за повреждённых пользовательских сервисов.",
    solution: "loginctl enable-linger $USER\n# Перезагрузите сессию",
    tags: ["arch", "systemd", "user", "uid", "ошибка"]
  },
  {
    id: 82,
    title: "Не работает Ethernet после обновления ядра",
    content: "Проводной интернет перестал работать. Причина — отсутствие драйвера или модуля ядра.",
    solution: "sudo modprobe e1000e\n# Или другой драйвер:\nlspci | grep Ethernet\n# Установите нужный драйвер",
    tags: ["arch", "ethernet", "ядро", "драйвер", "e1000e"]
  },
  {
    id: 83,
    title: "Ошибка: Failed to start Disk Mount Manager",
    content: "udisks2 не может смонтировать диск. Часто из-за отсутствия прав или повреждённой файловой системы.",
    solution: "sudo systemctl restart udisks2\n# Проверьте диск:\nsudo fsck /dev/sdX1",
    tags: ["arch", "udisks2", "монтирование", "диск", "ошибка"]
  },
  {
    id: 84,
    title: "Не работает скролл в Firefox",
    content: "В Firefox не работает колесо мыши. Причина — конфликт с расширениями или настройками.",
    solution: "Откройте about:config\nНайдите 'mousewheel.default.delta_multiplier_y'\nУстановите значение 100",
    tags: ["arch", "firefox", "скролл", "мышка", "настройка"]
  },
  {
    id: 85,
    title: "Ошибка: Failed to start PackageKit",
    content: "PackageKit не запускается. Часто из-за отсутствия пакета или конфликта с pacman.",
    solution: "sudo pacman -S packagekit\nsudo systemctl start packagekit\n# Или отключите:\nsudo systemctl disable packagekit",
    tags: ["arch", "packagekit", "pacman", "ошибка", "сервис"]
  },
  {
    id: 86,
    title: "Не работает Bluetooth-аудио (A2DP)",
    content: "Bluetooth-гарнитура подключается, но звук идёт через динамики. Нужно вручную выбрать профиль.",
    solution: "pavucontrol\n# В 'Настройка' выберите устройство и установите 'Выход A2DP'",
    tags: ["arch", "bluetooth", "a2dp", "звук", "гарнитура"]
  },
  {
    id: 87,
    title: "Ошибка: Failed to start Modem Manager",
    content: "ModemManager не запускается. Часто из-за отсутствия модема или конфликта с другими сервисами.",
    solution: "sudo systemctl status ModemManager\n# Если не нужен — отключите:\nsudo systemctl disable ModemManager",
    tags: ["arch", "modem", "manager", "ошибка", "сервис"]
  },
  {
    id: 88,
    title: "Не работает яркость экрана на ноутбуке",
    content: "Кнопки регулировки яркости не работают. Причина — отсутствие поддержки в ядре.",
    solution: "sudo nano /etc/default/grub\n# Добавьте в GRUB_CMDLINE_LINUX:\nacpi_backlight=vendor\n# Обновите:\nsudo grub-mkconfig -o /boot/grub/grub.cfg",
    tags: ["arch", "яркость", "ноутбук", "acpi", "grub"]
  },
  {
    id: 89,
    title: "Ошибка: Failed to start Cron Daemon",
    content: "cron не запускается. Часто из-за отсутствия пакета или конфликта с systemd-timers.",
    solution: "sudo pacman -S cronie\nsudo systemctl enable cronie\nsudo systemctl start cronie",
    tags: ["arch", "cron", "cronie", "ошибка", "таймер"]
  },
  {
    id: 90,
    title: "Не работает Caps Lock как Esc",
    content: "Вы настроили Caps Lock как Esc, но не работает. Нужно применить настройки.",
    solution: "setxkbmap -layout us -option caps:escape\n# Для постоянства добавьте в ~/.xprofile",
    tags: ["arch", "клавиатура", "caps", "esc", "xorg"]
  },
  {
    id: 91,
    title: "Ошибка: Failed to start Print Backend",
    content: "CUPS не может запустить бэкенд печати. Часто из-за отсутствия драйверов.",
    solution: "sudo systemctl restart cups\nsudo pacman -S cups-pdf hplip\n# Откройте: http://localhost:631",
    tags: ["arch", "печать", "cups", "hplip", "ошибка"]
  },
  {
    id: 92,
    title: "Не работает HDMI-аудио после обновления",
    content: "Звук через HDMI перестал работать. Причина — отсутствие модуля или неправильный выход.",
    solution: "pavucontrol\n# Выберите HDMI в 'Выходное устройство'\n# Или перезагрузите модуль:\nsudo modprobe snd_hda_intel",
    tags: ["arch", "hdmi", "звук", "pavucontrol", "snd_hda"]
  },
  {
    id: 93,
    title: "Ошибка: Failed to start Virtual File System",
    content: "systemd не может смонтировать виртуальные файловые системы. Часто из-за повреждения /etc/fstab.",
    solution: "sudo nano /etc/fstab\n# Удалите или закомментируйте проблемные строки\nsudo mount -a",
    tags: ["arch", "systemd", "fstab", "vfs", "ошибка"]
  },
  {
    id: 94,
    title: "Не работает скриншот в GNOME",
    content: "GNOME не делает скриншоты. Причина — отсутствие утилиты или конфликта с расширениями.",
    solution: "sudo pacman -S gnome-screenshot\n# Переназначьте клавишу в 'Настройки клавиатуры'",
    tags: ["arch", "gnome", "скриншот", "screenshot", "не работает"]
  },
  {
    id: 95,
    title: "Ошибка: Failed to start Power Profiles Daemon",
    content: "power-profiles-daemon не запускается. Часто из-за конфликта с TLP или отсутствия пакета.",
    solution: "sudo pacman -S power-profiles-daemon\nsudo systemctl enable power-profiles-daemon\n# Или отключите TLP:\nsudo systemctl disable tlp",
    tags: ["arch", "питание", "power", "daemon", "ошибка"]
  },
  {
    id: 96,
    title: "Не работает скролл на тачпаде",
    content: "Тачпад не реагирует на скролл двумя пальцами. Нужно включить в настройках.",
    solution: "В 'Настройки мыши и тачпада' включите 'Двигайте двумя пальцами для скролла'",
    tags: ["arch", "тачпад", "скролл", "libinput", "не работает"]
  },
  {
    id: 97,
    title: "Ошибка: Failed to start GeoClue",
    content: "GeoClue не запускается. Часто из-за отсутствия пакета или конфликта с приватностью.",
    solution: "sudo pacman -S geoclue\nsudo systemctl start geoclue\n# Или отключите:\nsudo systemctl disable geoclue",
    tags: ["arch", "геолокация", "geoclue", "ошибка", "сервис"]
  },
  {
    id: 98,
    title: "Не работает Bluetooth на старом адаптере",
    content: "Старый Bluetooth адаптер не поддерживается. Причина — отсутствие firmware или драйверов.",
    solution: "sudo pacman -S bluez-firmware\nsudo modprobe btusb\n# Проверьте поддержку:\nlsusb",
    tags: ["arch", "bluetooth", "firmware", "btusb", "старый"]
  },
  {
    id: 99,
    title: "Ошибка: Failed to start Avahi",
    content: "Avahi не запускается. Часто из-за конфликта с сетевыми сервисами или отсутствия пакета.",
    solution: "sudo pacman -S avahi\nsudo systemctl start avahi-daemon\nsudo systemctl enable avahi-daemon",
    tags: ["arch", "avahi", "mdns", "сетевой", "ошибка"]
  },
  {
    id: 100,
    title: "Не работает suspend на старом ноутбуке",
    content: "Система не засыпает или сразу просыпается. Причина — отсутствие поддержки S3 или конфликт USB.",
    solution: "sudo nano /etc/default/grub\n# Добавьте в GRUB_CMDLINE_LINUX:\nacpi_osi=Linux acpi_backlight=vendor\n# Обновите:\nsudo grub-mkconfig -o /boot/grub/grub.cfg",
    tags: ["arch", "suspend", "ноутбук", "acpi", "s3"]
  },
    {
    id: 101,
    title: "Неизвестное приложение сломало систему: как найти причину",
    content: "После обновления или установки нового ПО система стала работать нестабильно: тормозит, не запускаются приложения, GUI глючит, или система не загружается. При этом ты не знаешь, что именно сломалось. Эта запись поможет тебе найти виновника и исправить проблему.",
    solution: "# 1. Проверь логи системы:\njournalctl -b\njournalctl -b -p err\n\n# 2. Проверь логи ядра:\ndmesg | grep -i error\n\n# 3. Посмотри последние установленные пакеты:\nless /var/log/pacman.log\n\n# 4. Проверь автозагрузку:\nsystemctl list-units --state=failed\n\n# 5. Откати последние пакеты (если причина в них):\nsudo pacman -U /var/cache/pacman/pkg/имя_пакета.tar.zst\n\n# 6. Загрузись в предыдущее ядро через GRUB\n\n# 7. Удали подозрительные пакеты:\nsudo pacman -Rns имя_пакета\n\n# 8. Пересоздай образ initramfs:\nsudo mkinitcpio -P\n\n# 9. Обнови GRUB:\nsudo grub-mkconfig -o /boot/grub/grub.cfg",
    tags: ["arch", "диагностика", "логи", "pacman", "journalctl", "сломано", "неизвестно"]
  }
];