package kh.coded.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.DMRoomDTO;
import kh.coded.dto.DMRoomListDTO;
import kh.coded.repositories.DMDAO;
import kh.coded.repositories.DMRoomDAO;
import kh.coded.repositories.DMRoomUserDAO;
import kh.coded.repositories.MemberDAO;
import utils.StaticValue;

@Service
public class DMRoomService {

	@Autowired
	private MemberDAO memberDAO;

	@Autowired
	private DMDAO dmDAO;

	@Autowired
	private DMRoomDAO dmRoomDAO;

	@Autowired
	private DMRoomUserDAO dmRoomUserDAO;

	public List<DMRoomListDTO> selectByUserNo (int userNo) {
		return dmRoomDAO.selectByUserNo(userNo);	
	}

	public int createRoomId () {
		return dmRoomDAO.createRoomId();
	}
	
	//Admin page 기능
	
	public void deleteRoomByRoomId(int roomId) {
		dmRoomDAO.deleteRoomByRoomId(roomId);
	}
	
	public DMRoomDTO selectOneByRoomId(int roomId) {
		return dmRoomDAO.selectOneByRoomId(roomId);
	}
	
	public List<DMRoomDTO> selectPagingList(int cpage){
        int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
        int endNum = cpage * feedCountPerPage;
        int startNum = endNum - (feedCountPerPage - 1);
        
        return dmRoomDAO.selectPagingList(startNum, endNum);
	}
	
	public Map<String, Object> getPageNaviList(int cpage){
		//1. 전체 글의 개수
        int recordTotalCount = dmRoomDAO.getRecordCount();
        //2. 페이지당 보여줄 글의 개수
        int recordCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
        //3. 페이지당 보여줄 네비게이터의 수
        int naviCountPerPage = StaticValue.NAVICOUNTPERPAGE;

        //4. 1번과 2번 항목에 의해 총 페이지의 개수가 정해짐.
        //전체 글의 개수를 페이지당
        int pageTotalCount = recordTotalCount % recordCountPerPage > 0 ?
                recordTotalCount / recordCountPerPage + 1
                : recordTotalCount / recordCountPerPage;

        if (cpage < 1) {
            cpage = 1;
        } else if (cpage > pageTotalCount) {
            cpage = pageTotalCount;
        }

        int startNavi = (cpage - 1) / naviCountPerPage * naviCountPerPage + 1;
        int endNavi = startNavi + (naviCountPerPage - 1);

        if (endNavi > pageTotalCount) {
            endNavi = pageTotalCount;
        }

        boolean needPrev = true;
        boolean needNext = true;
        ArrayList<Integer> list = new ArrayList<>();

        if (startNavi == 1) {
            needPrev = false;
        }
        if (endNavi == pageTotalCount) {
            needNext = false;
        }
        for (int i = startNavi; i <= endNavi; i++) {
            list.add(i);
        }

        Map<String, Object> data = new HashMap<>();
        data.put("naviList", list);
        data.put("needPrev", needPrev);
        data.put("needNext", needNext);

        return data;
	}
}
