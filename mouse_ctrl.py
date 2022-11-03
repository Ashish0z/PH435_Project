'''
This modole uses the pyautogui module to control the
mouse based on the arguments passed to it.
Argument should be in form of a string made up of
the following characters: 'u', 'd', 'l', 'r', 'c', 's'
'''
import sys
import pyautogui

cmd = sys.argv[1]
m_u = cmd.count(x for x in cmd if x == 'u')
m_d = cmd.count(x for x in cmd if x == 'd')
m_l = cmd.count(x for x in cmd if x == 'l')
m_r = cmd.count(x for x in cmd if x == 'r')

pyautogui.moveRel((m_r - m_l) * 10, (m_u - m_d) * 10)
print(m_d - m_u, m_r - m_l)
