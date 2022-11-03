'''
This modole uses the pyautogui module to control the
mouse based on the arguments passed to it.
Argument should be in form of a string made up of
the following characters: 'u', 'd', 'l', 'r', 'c', 's'
'''
import sys
import pyautogui

cmd = sys.argv[1]
lst = cmd.split('c')
for i in range(len(lst)):
    m_d = lst[i].count('d')
    m_u = lst[i].count('u')
    m_l = lst[i].count('l')
    m_r = lst[i].count('r')
    if (i < len(lst) - 1):
        pyautogui.moveRel(m_r - m_l, m_u - m_d)
        pyautogui.click()
    else:
        pyautogui.moveRel((m_r - m_l), (m_u - m_d))
    print(m_d - m_u, m_r - m_l)
