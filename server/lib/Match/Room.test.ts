import { Client } from 'colyseus'
import { stub } from 'sinon'
import shared from 'shared-examples-for'

import MatchRoom from './Room'
import MatchState from './State'

import ClientMock from '@test/mocks/Client'
import UpdatePlayerPositionActionMock from '@test/mocks/UpdatePlayerPositionAction'
import PersistPlayerProjectileActionMock from '@test/mocks/PersistPlayerProjectileAction'

shared.examplesFor('it proxies action to correct state method', ({
  actionMock,
  actionType,
  expectedStateMethod
} : {
  actionMock: any,
  actionType: string,
  expectedStateMethod: 'addPlayer' | 'removePlayer' | 'updatePlayerPosition' | 'persistPlayerProjectile'
}) => {
  describe(`when action.type === ${actionType}`, () => {
    it(`proxies call to this.state.${expectedStateMethod}`, () => {
      const matchRoom = new MatchRoom()
      const client = new ClientMock()
      const action = new actionMock
      matchRoom.onInit({})
      const spy = jest.spyOn(matchRoom.state, expectedStateMethod).mockReturnValue()
      matchRoom.onMessage(client, action)
      expect(spy).toHaveBeenCalledWith(client, action)
    })
  })
})

describe('MatchRoom', () => {
  describe('#onInit', () => {
    it('sets state to an instance of Room', () => {
      const matchRoom = new MatchRoom()
      matchRoom.onInit({})
      expect(matchRoom.state).toBeInstanceOf(MatchState)
    })
  })

  describe('onMessage', () => {
    describe('when action.type is "updatePlayerPosition"', () => {
      shared.shouldBehaveLike('it proxies action to correct state method', {
        actionType: 'updatePlayerPosition',
        actionMock: UpdatePlayerPositionActionMock,
        expectedStateMethod: 'updatePlayerPosition'
      })

      shared.shouldBehaveLike('it proxies action to correct state method', {
        actionType: 'persistPlayerProjectile',
        actionMock: PersistPlayerProjectileActionMock,
        expectedStateMethod: 'persistPlayerProjectile'
      })
    })
  })
})
